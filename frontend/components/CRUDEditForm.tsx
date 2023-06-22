import { TableColumnProps } from "./CRUD";
import Button from "./Button";
import Input from "./Input";

interface Props {
    route: string
    fields: TableColumnProps
    columns: Array<{tableColumn: string, value?: any, props?: any}>
}


function CRUDEditForm({
    route,
    fields,
    columns,
}: Props) {
    return <div className="block">
        <form>
            
        </form>
    </div>
}

export default CRUDEditForm;