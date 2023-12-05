Picture this: you're working on a scheduling task project, and you're using Material React Table to display and edit a list of jobs. Everything is going swimmingly, until you come across a column called 'parameters'. This column contains JSON data, and editing a large and complex JSON field in cell edit mode is about as fun as a root canal. 

![edit json in cell](../../../assets/posts/2023-12-05-Jazzing-Up-JSON-Editing-in-Material-React-Table-with-Monaco-React/1.jpg)

It's like trying to assemble a 1000-piece jigsaw puzzle in a shoebox. Not exactly the most user-friendly experience, right? 

But don't worry, we've got a solution. Enter `monaco-react`, a super intuitive editor component with a VS Code vibe. And the best part? Material React Table supports custom editing components. So, let's roll up our sleeves and get to work.

First off, we need to declare the use of a custom edit component in the Material React Table's Columns. When the save button in the custom component is clicked, it triggers the save action.

```javascript
 const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [           
...
             {
                accessorKey: 'params',
                header: 'params',
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
**Note**: When saving or cancelling modifications, **you need to call** `table.setEditingCell(null);` to exit edit mode. If your `editDisplayMode="row"`, then you should call `table.setEditingRow(null)`. 

Next, we use `monaco-react` to create the `JsonView` component.

```javascript
import Editor from '@monaco-editor/react';
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useState } from "react";
import { showAlert } from '../alert/alert';

export default function JsonView(props: { jsonStr: string , onClose: () => void,onSave: (json:string,close:()=>void) => void }) {
    const [showView, setShowView] = useState(true);
    const [jsonStr, setJsonStr] = useState(props.jsonStr);
    return <>
        {showView && <Dialog fullWidth={true} maxWidth={"xl"} open={showView} onClose={() => {props.onClose();setShowView(false)}}>
            <DialogActions>
                <Button onClick={() => setShowView(false)}>Close</Button>
                <Button onClick={() => {
                    try{
                        JSON.parse(jsonStr);
                    }catch(e){
                        showAlert({message: 'json format error',type:'error'});
                        return;
                    }
                    props.onSave(jsonStr,()=>setShowView(false))}
                }>Save</Button>
            </DialogActions>
            <DialogContent>
                <Editor height="90vh" defaultLanguage="json" defaultValue={JSON.stringify(JSON.parse(props.jsonStr), null, 2)} onChange={(value) => setJsonStr(value ?? "")} theme="vs-light"  />;
            </DialogContent>    
        </Dialog>}
    </>;
}

```

And voila! Now, when you double-click the parameter cell, a pop-up will appear with a beautiful VS Code-style JSON editor embedded within it.

![edit with json editor](../../../assets/posts/2023-12-05-Jazzing-Up-JSON-Editing-in-Material-React-Table-with-Monaco-React/2.jpg)

It's like swapping out that shoebox for a spacious worktable. Much better, right?