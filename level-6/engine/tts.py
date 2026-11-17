# Edge neural TTS through the session proxy. usage: python3 tts.py jobs.json
import asyncio, ssl, os, sys, json, edge_tts, edge_tts.communicate as cm
cm._SSL_CTX = ssl.create_default_context(cafile=os.environ.get('CCR_CA', '/root/.ccr/ca-bundle.crt'))
PX = os.environ.get('HTTPS_PROXY')
async def one(j):
    for a in range(8):
        try:
            await asyncio.wait_for(edge_tts.Communicate(j['text'], j['voice'], rate=j.get('rate', '+0%'), proxy=PX).save(j['out']), 45)
            if os.path.getsize(j['out']) > 1000: return True
        except Exception as e:
            pass
        await asyncio.sleep(2 * (a + 1))
    print('FAILED:', j['text'][:70], file=sys.stderr); return False
async def main():
    jobs = json.load(open(sys.argv[1])); sem = asyncio.Semaphore(3)
    async def run(j):
        async with sem: return await one(j)
    ok = await asyncio.gather(*[run(j) for j in jobs])
    print(f'tts: {sum(ok)}/{len(jobs)} ok'); sys.exit(0 if all(ok) else 1)
asyncio.run(main())
