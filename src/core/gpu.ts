﻿import _gpu = require('./gpu/gpu'); _gpu.PspGpu; 
import _state = require('./gpu/state'); _state.AlphaTest;

export import PspGpu = _gpu.PspGpu;
export import SyncType = _state.SyncType;
export import DisplayListStatus = _state.DisplayListStatus;
