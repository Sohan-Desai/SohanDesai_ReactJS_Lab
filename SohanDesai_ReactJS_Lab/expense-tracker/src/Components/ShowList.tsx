
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IDataList from "../models/IDataList";
import { getDataFromServer } from "../services/Menu";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>(0);
    const [rahulspent, setRahulspent] = useState<number>(0);
    const [rameshspent, setRameshspent] = useState<number>(0);
    const [showform, setShowform] = useState<boolean>(false);


    var rahulspent1: number = 0;
    var rameshspent1: number = 0;

    useEffect(() => {

        const fetchMenu = async () => {

            try {
                const data = await getDataFromServer();
                setItems(data);
                setSum(data.reduce((result, v) => (result + v.price), 0));
                shares(data);

            } catch (error: any) {
                setError(error);
            }
        }
        console.log("-------------------useEffect called----------------------");
        fetchMenu()

    }, [showform])

    const sumTrack = (data: IDataList, sum: number) => {
        sum = sum + data.price;
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
            <div className="button-Bar">
                <button id="Add-Button" onClick={() => setShowform(true)}>Add</button>
                <Link to="add" id="Add-Button" target="_blank" rel="noopener noreferrer" >Go to Add</Link>

            </div>

            {
                showform && (<div>
                    <ExpenseTracker onTrue={() => setShowform(false)} onClose={() => setShowform(false)} />
                </div>)
            }

            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color payee">Payee</div>
            </>

            {
                items && items.map((user, idx) => (
                    <div className="tuple" key={user.id}>
                        <div className="use-inline date">{user.setDate}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className={`use-inline payee ${user.payeeName}`}>{user.payeeName}</div>
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
            <span className="use-inline total payable price">{Math.abs((rahulspent - rameshspent) / 2)}</span>
            <br />

            {error && <>{error?.message}</>}
        </>
    )
}

export default ShowData;