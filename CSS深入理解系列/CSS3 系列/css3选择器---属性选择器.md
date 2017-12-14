E[attr]  该选择器选择包含 attr 属性的所有元素，不论 attr 的值为何。

E[attr="value"]  该选择器仅选择 attr 属性被赋值为 val 的所有元素。

E[attr~="value"]  该选择器仅选择 attr 属性的值（以空格间隔出多个值）中有包含 val 值的所有元素，比如位于被空格分隔的多个类（class）中的一个类。

E[attr^="value"]  选择attr属性的值以val开头（包括val）的元素。

E[attr$="value"]  选择attr属性的值以val结尾（包括val）的元素。

E[attr*="value"]  选择attr属性的值中包含字符串val的元素。

E[attr|="value"]  选择attr属性的值以val（包括val）或val-开头的元素（-用来处理语言编码）。
