﻿export enum GpuOpCodes {
	NOP = 0x00, VADDR = 0x01, IADDR = 0x02, Unknown0x03 = 0x03,
	PRIM = 0x04, BEZIER = 0x05, SPLINE = 0x06, BOUNDINGBOX = 0x07,
	JUMP = 0x08, BJUMP = 0x09, CALL = 0x0A, RET = 0x0B,
	END = 0x0C, Unknown0x0D = 0x0D, SIGNAL = 0x0E, FINISH = 0x0F,
	BASE = 0x10, Unknown0x11 = 0x11, VERTEXTYPE = 0x12, OFFSETADDR = 0x13,
	ORIGIN = 0x14, REGION1 = 0x15, REGION2 = 0x16, LIGHTINGENABLE = 0x17,
	LIGHTENABLE0 = 0x18, LIGHTENABLE1 = 0x19, LIGHTENABLE2 = 0x1A, LIGHTENABLE3 = 0x1B,
	CLIPENABLE = 0x1C, CULLFACEENABLE = 0x1D, TEXTUREMAPENABLE = 0x1E, FOGENABLE = 0x1F,
	DITHERENABLE = 0x20, ALPHABLENDENABLE = 0x21, ALPHATESTENABLE = 0x22, ZTESTENABLE = 0x23,
	STENCILTESTENABLE = 0x24, ANTIALIASENABLE = 0x25, PATCHCULLENABLE = 0x26, COLORTESTENABLE = 0x27,
	LOGICOPENABLE = 0x28, Unknown0x29 = 0x29, BONEMATRIXNUMBER = 0x2A, BONEMATRIXDATA = 0x2B,
	MORPHWEIGHT0 = 0x2C, MORPHWEIGHT1 = 0x2D, MORPHWEIGHT2 = 0x2E, MORPHWEIGHT3 = 0x2F,
	MORPHWEIGHT4 = 0x30, MORPHWEIGHT5 = 0x31, MORPHWEIGHT6 = 0x32, MORPHWEIGHT7 = 0x33,
	Unknown0x34 = 0x34, Unknown0x35 = 0x35, PATCHDIVISION = 0x36, PATCHPRIMITIVE = 0x37,
	PATCHFACING = 0x38, Unknown0x39 = 0x39, WORLDMATRIXNUMBER = 0x3A, WORLDMATRIXDATA = 0x3B,
	VIEWMATRIXNUMBER = 0x3C, VIEWMATRIXDATA = 0x3D, PROJMATRIXNUMBER = 0x3E, PROJMATRIXDATA = 0x3F,
	TGENMATRIXNUMBER = 0x40, TGENMATRIXDATA = 0x41, VIEWPORTX1 = 0x42, VIEWPORTY1 = 0x43,
	VIEWPORTZ1 = 0x44, VIEWPORTX2 = 0x45, VIEWPORTY2 = 0x46, VIEWPORTZ2 = 0x47,
	TEXSCALEU = 0x48, TEXSCALEV = 0x49, TEXOFFSETU = 0x4A, TEXOFFSETV = 0x4B,
	OFFSETX = 0x4C, OFFSETY = 0x4D, Unknown0x4E = 0x4E, Unknown0x4F = 0x4F,
	SHADEMODE = 0x50, REVERSENORMAL = 0x51, Unknown0x52 = 0x52, MATERIALUPDATE = 0x53,
	MATERIALEMISSIVE = 0x54, MATERIALAMBIENT = 0x55, MATERIALDIFFUSE = 0x56, MATERIALSPECULAR = 0x57,
	MATERIALALPHA = 0x58, Unknown0x59 = 0x59, Unknown0x5A = 0x5A, MATERIALSPECULARCOEF = 0x5B,
	AMBIENTCOLOR = 0x5C, AMBIENTALPHA = 0x5D, LIGHTMODE = 0x5E, LIGHTTYPE0 = 0x5F,
	LIGHTTYPE1 = 0x60, LIGHTTYPE2 = 0x61, LIGHTTYPE3 = 0x62, LXP0 = 0x63,
	LYP0 = 0x64, LZP0 = 0x65, LXP1 = 0x66, LYP1 = 0x67,
	LZP1 = 0x68, LXP2 = 0x69, LYP2 = 0x6A, LZP2 = 0x6B,
	LXP3 = 0x6C, LYP3 = 0x6D, LZP3 = 0x6E, LXD0 = 0x6F,
	LYD0 = 0x70, LZD0 = 0x71, LXD1 = 0x72, LYD1 = 0x73,
	LZD1 = 0x74, LXD2 = 0x75, LYD2 = 0x76, LZD2 = 0x77,
	LXD3 = 0x78, LYD3 = 0x79, LZD3 = 0x7A, LCA0 = 0x7B,
	LLA0 = 0x7C, LQA0 = 0x7D, LCA1 = 0x7E, LLA1 = 0x7F,
	LQA1 = 0x80, LCA2 = 0x81, LLA2 = 0x82, LQA2 = 0x83,
	LCA3 = 0x84, LLA3 = 0x85, LQA3 = 0x86, SPOTEXP0 = 0x87,
	SPOTEXP1 = 0x88, SPOTEXP2 = 0x89, SPOTEXP3 = 0x8A, SPOTCUT0 = 0x8B,
	SPOTCUT1 = 0x8C, SPOTCUT2 = 0x8D, SPOTCUT3 = 0x8E, ALC0 = 0x8F,
	DLC0 = 0x90, SLC0 = 0x91, ALC1 = 0x92, DLC1 = 0x93,
	SLC1 = 0x94, ALC2 = 0x95, DLC2 = 0x96, SLC2 = 0x97,
	ALC3 = 0x98, DLC3 = 0x99, SLC3 = 0x9A, CULL = 0x9B,
	FRAMEBUFPTR = 0x9C, FRAMEBUFWIDTH = 0x9D, ZBUFPTR = 0x9E, ZBUFWIDTH = 0x9F,
	TEXADDR0 = 0xA0, TEXADDR1 = 0xA1, TEXADDR2 = 0xA2, TEXADDR3 = 0xA3,
	TEXADDR4 = 0xA4, TEXADDR5 = 0xA5, TEXADDR6 = 0xA6, TEXADDR7 = 0xA7,
	TEXBUFWIDTH0 = 0xA8, TEXBUFWIDTH1 = 0xA9, TEXBUFWIDTH2 = 0xAA, TEXBUFWIDTH3 = 0xAB,
	TEXBUFWIDTH4 = 0xAC, TEXBUFWIDTH5 = 0xAD, TEXBUFWIDTH6 = 0xAE, TEXBUFWIDTH7 = 0xAF,
	CLUTADDR = 0xB0, CLUTADDRUPPER = 0xB1, TRXSBP = 0xB2, TRXSBW = 0xB3,
	TRXDBP = 0xB4, TRXDBW = 0xB5, Unknown0xB6 = 0xB6, Unknown0xB7 = 0xB7,
	TSIZE0 = 0xB8, TSIZE1 = 0xB9, TSIZE2 = 0xBA, TSIZE3 = 0xBB,
	TSIZE4 = 0xBC, TSIZE5 = 0xBD, TSIZE6 = 0xBE, TSIZE7 = 0xBF,
	TMAP = 0xC0, TEXTURE_ENV_MAP_MATRIX = 0xC1, TMODE = 0xC2, TPSM = 0xC3,
	CLOAD = 0xC4, CMODE = 0xC5, TFLT = 0xC6, TWRAP = 0xC7,
	TBIAS = 0xC8, TFUNC = 0xC9, TEC = 0xCA, TFLUSH = 0xCB,
	TSYNC = 0xCC, FFAR = 0xCD, FDIST = 0xCE, FCOL = 0xCF,
	TSLOPE = 0xD0, Unknown0xD1 = 0xD1, PSM = 0xD2, CLEAR = 0xD3,
	SCISSOR1 = 0xD4, SCISSOR2 = 0xD5, MINZ = 0xD6, MAXZ = 0xD7,
	CTST = 0xD8, CREF = 0xD9, CMSK = 0xDA, ATST = 0xDB,
	STST = 0xDC, SOP = 0xDD, ZTST = 0xDE, ALPHA = 0xDF,
	SFIX = 0xE0, DFIX = 0xE1, DTH0 = 0xE2, DTH1 = 0xE3,
	DTH2 = 0xE4, DTH3 = 0xE5, LOP = 0xE6, ZMSK = 0xE7,
	PMSKC = 0xE8, PMSKA = 0xE9, TRXKICK = 0xEA, TRXSPOS = 0xEB,
	TRXDPOS = 0xEC, Unknown0xED = 0xED, TRXSIZE = 0xEE, Unknown0xEF = 0xEF,
	Unknown0xF0 = 0xF0, Unknown0xF1 = 0xF1, Unknown0xF2 = 0xF2, Unknown0xF3 = 0xF3,
	Unknown0xF4 = 0xF4, Unknown0xF5 = 0xF5, Unknown0xF6 = 0xF6, Unknown0xF7 = 0xF7,
	Unknown0xF8 = 0xF8, Unknown0xF9 = 0xF9, Unknown0xFA = 0xFA, Unknown0xFB = 0xFB,
	Unknown0xFC = 0xFC, Unknown0xFD = 0xFD, Unknown0xFE = 0xFE, DUMMY = 0xFF,
	
	// Rest of the struct
	MAT_TEXTURE = 256 + 16 * 1,
	MAT_PROJ = 256 + 16 * 2,
	MAT_VIEW = 256 + 16 * 3,
	MAT_WORLD = 256 + 16 * 4,
	MAT_BONES = 256 + 16 * 5,
}
