import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setHeaderData } from "../redux/headerSlice"
import store from "../redux/store"

const Header = ({total, setTotal}) => {
    // const [headerData, setHeaderData] = useState({
    //     vr_no: "",
    //     vr_date: "",
    //     status: "",
    //     ac_name:"",
    //     ac_amt: ""

    // })
    const headerData = useSelector(store => store.header.headerData )
    const dispatch = useDispatch()
    
    const handleChange = ( e ) =>{
        const { name, value } = e.target
        dispatch(setHeaderData({
            ...headerData, [name]:value}
        )      
    )}
    return (
        <>
        
        <div className="main-header">
            <div className="head">Header</div>
            <div className="header-content">
                <div className="vr">
                    <div><label>Vr No :-</label><input type="number" name="vr_no" value={headerData.vr_no} onChange={(e) => handleChange(e)}/></div>
                    <div><label>Vr Date :-</label><input type="date"value={headerData.vr_date} name="vr_date"  onChange={(e) => handleChange(e)}/></div>
                    <div><label>Status</label><input value={headerData.status} name="status"  onChange={(e) => handleChange(e)}/></div>
                    
                </div>
                <div className="ac">
                    <div><label>Ac Name:</label><input value={headerData.ac_name} name="ac_name"  onChange={(e) => handleChange(e)}/></div>
                    <div><label>Ac Amt</label><input type="number"  name="ac_amt" value={total} onChange={(e) => handleChange(e)} /></div>
                </div>
                
            </div>


        </div>
        </>
    )
}
export default Header