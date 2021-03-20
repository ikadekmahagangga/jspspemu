﻿import * as _utils from '../utils';
import * as _context from '../../context';
import nativeFunction = _utils.nativeFunction;

export class ExceptionManagerForKernel {
	constructor(private context: _context.EmulatorContext) { }

	@nativeFunction(0x565C0B0E, 150, 'uint', 'uint')
	sceKernelRegisterDefaultExceptionHandler(exceptionHandlerFunction: number) {
		return 0;
	}
}
