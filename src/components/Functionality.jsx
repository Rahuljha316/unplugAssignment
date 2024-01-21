import { useDispatch, useSelector } from "react-redux";
import { addRow, setRows } from "../redux/appSlice";
import { useEffect } from "react";
import { setHeaderData } from "../redux/headerSlice";
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { html2pdf } from "html2pdf.js";
const Functionality = ( {total,setTotal }) => {

    const initialRow = [{sr:1, code: '', name: '', qty:"",rate:"", amount:""}]
    const initialHeader = {
        vr_no: "",
        vr_date: "",
        status: "",
        ac_name:"",
        ac_amt: ""

    }
    const dispatch = useDispatch()
    const headerData = useSelector(store => store.header.headerData)
    
    const rows = useSelector(store => store.app.rows)
    
    
    const handleInsertClick =() => {
        dispatch(addRow())
        
    }
    const handleSave = async() => {
        if (!headerData.vr_no || !headerData.vr_date || !headerData.ac_name || !headerData.status) {
            alert("Please fill in all header fields before saving.");
            return;
          }

          if (rows.some(row => !row.code || !row.name || !row.qty || !row.rate)) {
            alert("Please fill in all detail fields before saving.");
            return;
          }
        const header_data = {
            vr_no: headerData.vr_no,
            vr_date: headerData.vr_date,
            ac_name: headerData.ac_name,
            ac_amt: total,
            status: headerData.status,
          };
      
          // Create the detail_table array by mapping over rows
          const detail_table = rows.map((row, index) => ({
            vr_no: headerData.vr_no,
            sr_no: row.sr,
            item_code: row.code,
            item_name: row.name,
            description: "", 
            qty: row.qty,
            rate: row.rate,
          }));
          const savedData = {
            header_table: header_data,
            detail_table: detail_table,
          };
          try {
            const response = await fetch("http://5.189.180.8:8010/header/multiple", {
              method: "POST",
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(savedData)
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const responseData = await response.json();
            console.log("Response from server:", responseData);
          } catch (error) {
            console.error("Error sending POST request:", error);
          }
        
    


    }
    const handleNewClick = () => {
        dispatch(setRows(initialRow))
        dispatch(setHeaderData(initialHeader))

    }
    const handlePrint = () => {
      if (!headerData.vr_no || !headerData.vr_date || !headerData.ac_name  || !headerData.status) {
        alert("Please fill in all header fields before printing.");
        return;
      }

      if (rows.some(row => !row.code || !row.name || !row.qty || !row.rate)) {
        alert("Please fill in all detail fields before printing.");
        return;
      }
      
      const pdf = new jsPDF();
  
      
      pdf.text("Voucher Details", 20, 10);
      
      
      pdf.text(`Vr No: ${headerData.vr_no}`, 20, 20);
      pdf.text(`Vr Date: ${headerData.vr_date}`, 20, 30);
      pdf.text(`Ac Name: ${headerData.ac_name}`, 20, 40);
      pdf.text(`Ac Amt: ${total}`, 20, 50);
      pdf.text(`Status: ${headerData.status}`, 20, 60);
  
      
      let startY = 80;
      rows.forEach((row) => {
        pdf.text(`Item Code: ${row.code}`, 20, startY);
        pdf.text(`Item Name: ${row.name}`, 20, startY + 10);
        pdf.text(`Qty: ${row.qty}`, 20, startY + 20);
        pdf.text(`Rate: ${row.rate}`, 20, startY + 30);
        pdf.text(`Amount: ${row.amount}`, 20, startY + 40);
        pdf.text("------------------------------", 20, startY + 50);
        startY += 60;
      });
  
      
      pdf.save("voucher.pdf");
    };
  
    return (
        <div className="functionality">
        <button onClick={handleNewClick}>New</button>
        <button onClick={() =>handleInsertClick()}>Insert</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handlePrint}>Print</button>
        </div>

    )
}

export default Functionality;