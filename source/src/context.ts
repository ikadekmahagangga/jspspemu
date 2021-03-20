﻿import {IPspDisplay} from "./core/display";
import {Config} from "./hle/config";
import {IPspController} from "./core/controller";
import {Battery} from "./core/battery";
import {PspRtc} from "./core/rtc";
import {PspGpu} from "./core/gpu";
import {
    CallbackManager,
    FileManager,
    Interop,
    MemoryManager,
    ModuleManager,
    NetManager,
    ThreadManager
} from "./hle/manager";
import {PspAudio} from "./core/audio";
import {Memory} from "./core/memory";
import {InterruptManager} from "./core/interrupt";
import {Signal1} from "./global/utils";

export interface ISymbol {
	address: number;
	size: number;
	name: string;
}

export interface ISymbolLookup {
	getSymbolAt(address: number): ISymbol;
}

export class EmulatorContext {
	display: IPspDisplay;
	config: Config;
	controller: IPspController;
	rtc: PspRtc;
	gpu: PspGpu;
	netManager: NetManager;
	memoryManager: MemoryManager;
	threadManager: ThreadManager;
	callbackManager: CallbackManager;
	moduleManager: ModuleManager;
	audio: PspAudio;
	memory: Memory;
	fileManager: FileManager;
	interruptManager: InterruptManager;
	symbolLookup: ISymbolLookup;
	interop: Interop;
	battery: Battery;
	onStdout = new Signal1<string>();
	onStderr = new Signal1<string>();

	container: any = {};
	gameTitle = 'unknown';
	gameId = 'unknown';

	constructor() {
	}
	
	get currentThread() { return this.threadManager.current; }
	get currentState() { return this.currentThread.state; }
	get currentInstructionCache() { return this.currentState.icache; }

	init(interruptManager: InterruptManager, display: IPspDisplay, controller: IPspController, gpu: PspGpu, memoryManager: MemoryManager, threadManager: ThreadManager, audio: PspAudio, memory: Memory, fileManager: FileManager, rtc: PspRtc, callbackManager: CallbackManager, moduleManager: ModuleManager, config: Config, interop: Interop, netManager: NetManager, battery: Battery) {
		this.interruptManager = interruptManager;
		this.display = display;
		this.controller = controller;
		this.gpu = gpu;
		this.memoryManager = memoryManager;
		this.threadManager = threadManager;
		this.audio = audio;
		this.memory = memory;
		this.fileManager = fileManager;
		this.rtc = rtc;
		this.callbackManager = callbackManager;
		this.moduleManager = moduleManager;
		this.config = config;
		this.interop = interop;
		this.netManager = netManager;
		this.battery = battery;
	}
}
