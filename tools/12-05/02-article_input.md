在Material React Table中，使用monaco-react作为某一列的编辑器。

最近做了一个调度任务的项目，我们采用Material React Table展示并编辑Job列表，我们采用editDisplayMode="cell"编辑模式，起初一切都看起来很不错。可是Job有一列叫做参数，这个参数是json形式的。显然，在editDisplayMode="cell"模式下编辑一个大而复杂的JSON字段是非常痛苦的。
如下图：
![edit json in cell](./1.png)

如何解决这个问题呢？ 我们知道monaco-react是一个非常直观的vscode风格的编辑器组件。Material React Table支持使用自定义调度编辑组件，所以我们可以干起来了

1. 首先，在Material React Table的Columns里，声明使用自定义Edit组件，并且在自定义组件里点击保存按钮后，触发保存动作

```javascript
 const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [           
...
             {
                accessorKey: 'params',
                header: '参数',
                size: 150,
                enableClickToCopy: true,
                Edit: ({ cell,table }) => (
                    <JsonView
                        jsonStr={cell.getValue<string>()}
                        onClose={() => {
                            table.setEditingCell(null);
                        }}
                        onSave={(json, close) => {
                            handleSaveCell(cell, json);
                            table.setEditingCell(null);
                            close();
                        }}
                    />
                ),
            },
...
        ]
<MaterialReactTable
            columns={columns}
            enableEditing
            editDisplayMode="cell"
            ...
 />
```

注意： 这里当保存修改，或者取消修改时，都需要调用table.setEditingCell(null);来退出编辑模式。 如果你的editDisplayMode="row"，则应该调用table.setEditingRow(null)

2. 我们使用monaco-react来编写JsonView组件
```javascript
import Editor from '@monaco-editor/react';
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";

export default function JsonView(props: { jsonStr: string , onClose: () => void,onSave: (json:string,close:()=>void) => void }) {
    const [showView, setShowView] = useState(true);
    const [jsonStr, setJsonStr] = useState(props.jsonStr);
    return <>
        {showView && <Dialog fullWidth={true} maxWidth={"xl"} open={showView} onClose={() => {props.onClose();setShowView(false)}}>
            <DialogActions>
                <Button onClick={() => setShowView(false)}>Close</Button>
                <Button onClick={() => {
                    props.onSave(jsonStr,()=>setShowView(false))}
                }>Save</Button>
            </DialogActions>
            <DialogContent>
                <Editor height="90vh" defaultLanguage="json" defaultValue={JSON.stringify(JSON.parse(jsonStr), null, 2)} onChange={(value) => setJsonStr(value ?? "")} theme="vs-light"  />;
            </DialogContent>    
        </Dialog>}
    </>;
}
```


现在，双击参数单元格时，就会弹出一个内嵌了漂亮的vscode样式的json编辑器的弹窗了
![edit with json editor](./2.png)