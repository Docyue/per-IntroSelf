// ---------类型化的数组允许存储和操作八种不同的数字类型
// 签名的8位整数（int8）
// 无符号8位整数（uint8）
// 有符号的16位整数（int16）
// 无符号16位整数（uint16）
// 签名的32位整数（int32）
// 无符号32位整数（uint32）
// 32位浮点数（float32）
// 64位浮点数（float64）
// ------操纵数组缓冲区与视图
// 数组缓冲区表示内存位置，视图是用于操作该内存的接口
let buffer = new ArrayBuffer(10),
    view = new DataView(buffer);

let buffer = new ArrayBuffer(10),
    view = new DataView(buffer, 5, 2);  
























    