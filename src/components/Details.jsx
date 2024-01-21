import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setRows } from "../redux/appSlice";

const Details = ({ total, setTotal }) => {
    const rows = useSelector(store => store.app.rows)
    const dispatch = useDispatch()
    
    const handleChange = (index, field, value) =>{
        const updatedRows = [...rows]
        updatedRows[index] = {...updatedRows[index], [field]: value}
        
        if (field === "qty" || field === "rate") {
            const newAmount = updatedRows[index].qty * updatedRows[index].rate;
            updatedRows[index] = { ...updatedRows[index], amount: newAmount };
        }

        dispatch(setRows(updatedRows));
        

        
    }
    useEffect(()=>{
        const final = rows.map((item) => item.amount).reduce((acc,curr) => acc+curr)
    
    setTotal(final)

    },[rows])
    
    return (
        <>
        <div>
            <div className="detail-head">Detail</div>
            <div className="data-table">
                <table>
                    <thead>
                        <tr className="table-head">
                            <th className="sr">Sr. NO</th>
                            <th className="code">Item Code</th>
                            <th className="name">Item Name</th>
                            <th className="qty">Qty</th>
                            <th className="rate">Rate</th>
                            <th className="amount">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row,index) =>{
                            return (
                            <tr key={index} className="table-cell">
                                <td className="rowsr">{row.sr}</td>
                                <td className="mid"><input onChange={(e) => handleChange(index, 'code',e.target.value)} value={row.code}/></td>
                                <td className="max"><input onChange={(e) => handleChange(index, 'name',e.target.value)}value={row.name}/></td>
                                <td className="min data"><input type="number" value={row.qty} onChange={(e) => handleChange(index, 'qty',e.target.value)}/></td>
                                <td className="min data"><input type="number" value={row.rate} onChange={(e) => handleChange(index, 'rate',e.target.value)}/></td>
                                <td className="min data"><input type="number" readOnly value={row.amount}/></td>
                            </tr>
                            )
                            
                        })}
                        
                    </tbody>
                    <tfoot>
                        <tr className="table-foot">
                            <td className="empty"></td>
                            <td className="total">Total :-</td>
                            <td className="total-value">{total}</td>
                        </tr>
                    </tfoot>
                    
                </table>
            </div>
        </div>
        </>
    )
}
export default Details