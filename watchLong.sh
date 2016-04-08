#!/bin/bash

echo "on 0" | cec-client -s
echo "as" | cec-client -s
sleep 7s
livestreamer $1 best --player omxplayer --fifo