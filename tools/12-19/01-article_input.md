今天在处理excel时，发现一个特殊的excel文件，不管采用什么编码打开，都会报错‘UnicodeDecodeError: 'utf-16-le' codec can't decode bytes in position 0-1: unexpected end of data’。
你可以下载一下[这个文件]((../../../assets/posts/2023-12-19-A/demo.xls))试试

处理代码
```python
import pandas as pd

import xlrd.book
import xlrd
            
wb = xlrd.book.open_workbook_xls('demo.xls')
df = pd.read_excel(wb)
print(df.head())
```

经过调试，会发现有类似b'\xd8'这样的字符在decode时失败，xlrd提供了参数encoding_override来指定编码格式, 比如
```python
import pandas as pd

import xlrd.book
import xlrd
            
wb = xlrd.book.open_workbook_xls('demo.xls',encoding_override='utf-16')
df = pd.read_excel(wb)
print(df.head())
```

但是，不论采用哪种编码格式，仍然报错，可见，是这个excel本身确实存在某些编码错误， 由于线上环境不允许修改xlrd库，所以我们只能采用monkey patch的方式来修改, 修改后的代码如下:
```python

import pandas as pd

def my_unpack_SST_table(datatab, nstrings):
    try:
        return t(datatab, nstrings)
    except:
        for i in range(len(datatab)):
            datatab[i] = datatab[i].replace(b'\xd8', b'\x00')
            datatab[i] = datatab[i].replace(b'\xdf', b'\x00')
            datatab[i] = datatab[i].replace(b'\xdc', b'\x00')
            datatab[i] = datatab[i].replace(b'\xdd', b'\x00')
            datatab[i] = datatab[i].replace(b'\xde', b'\x00')
 
        return t(datatab, nstrings)


import xlrd.book
import xlrd
t = xlrd.book.unpack_SST_table
xlrd.book.unpack_SST_table = my_unpack_SST_table
            
wb = xlrd.book.open_workbook_xls('demo.xls')
df = pd.read_excel(wb)
print(df.head())

```

这样子就可以成功读取这个excel的内容了