# -*- coding: utf-8 -*-

import asyncio
import websockets
import dbm
import sqlite3
from datetime import datetime


connected_clients = set()
ip_port = 9998;

async def handler(websocket,path):
    """  """
    connected_clients.add(websocket)
    try:
        async for message in websocket:
           # reply = f"Data received as '{message}'. time:{datetime.now()}" 
           # print(reply)
           # await websocket.send(reply)
            await broadcast(message)

    finally:
        connected_clients.remove(websocket)

async def broadcast(message):
    """  """
    print('message-=>'+message)
    for client in connected_clients:
        await client.send(message)

async def main():
    async with websockets.serve(handler,"localhost",ip_port):
        await asyncio.Future()
        loop = asyncio.get_running_loop()
        loop.create_task(broadcast())

if __name__ == '__main__':
    asyncio.run(main())


