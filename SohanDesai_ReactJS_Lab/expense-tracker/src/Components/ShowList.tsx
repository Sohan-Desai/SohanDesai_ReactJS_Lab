
import { useState, useEffect } from "react";
import IDataList from "../models/IDataList";
import { getDataFromServer } from "../services/Menu";
import AddForm from "./AddForm";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>(0);
    const [rahulspent, setRahulspent] = useState<number>(0);
    const [rameshspent, setRameshspent] = useState<number>(0);
    const [responseStatus, setResponseStatus] = useState<'initial' | 'success' | 'error'>('initial');
    const [toastMessage, setToastMessage] = useState<string>("");
    const [showform, setShowform] = useState<boolean>(false);

    var rahulspent1: number = 0;
    var rameshspent1: number = 0;

    useEffect(() => {

        const fetchMenu = async () => {

            try {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, v) => (result +parseInt(v.price)), 0));
                shares(data);
                console.log("++++++++++++++++++++++++fetchmenu called++++++++++++++++++++++");

            } catch (error: any) {
                setError(error);
            }
        }
        console.log("-------------------useEffect called----------------------");
        fetchMenu()

    }, [showform])

    const sumTrack = (data: IDataList, sum: number) => {
        sum = sum + parseInt(data.price);
        console.log(data.payeeName + " paid " + sum);
        return sum;
    }

    const shares = (data: IDataList[]) => {
        data.map(
            (sams) =>
                sams.payeeName === 'Rahul' ? (rahulspent1 = sumTrack(sams, rahulspent1)) : (rameshspent1 = sumTrack(sams, rameshspent1))
        );

        setRahulspent(rahulspent1);
        setRameshspent(rameshspent1);
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowform(true)}>Add</button>

            {
                showform && (<div>
                    <AddForm onTrue={() => setShowform(false)} onClose={() => setShowform(false)} />
                </div>)
            }

            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>Payee</div>
            </>

            {
                items && items.map((user, idx) => (
                    <div key={user.id}>
                        <div className="use-inline date">{user.setDate}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className="use-inline">{user.payeeName}</div>
                    </div>
                ))
            }
            <hr />

            <div className="use-inline">Total : </div>
            <span className="use-inline total">{sum}</span>
            <br />

            <div className="use-inline">Rahul Paid : </div>
            <span className="use-inline total Rahul">{rahulspent}</span>
            <br />

            <div className="use-inline">Ramesh Paid : </div>
            <span className="use-inline total Ramesh">{rameshspent}</span>
            <br />

            <div className="use-inline payable">
                {rahulspent > rameshspent ? "Pay Rahul" : "Pay Ramesh"}
            </div>
            <span className="use-inline total payable price">{Math.abs((rahulspent - rameshspent)/2)}</span>
            <br />

            {error && <>{error?.message}</>}
        </>
    )
}

export default ShowData;