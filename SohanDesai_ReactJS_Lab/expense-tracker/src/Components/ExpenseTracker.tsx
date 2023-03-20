import React, { useState } from 'react'
import IDataList from '../models/IDataList'
import { pushDataToServer } from '../services/Menu'
import { useParams, useNavigate } from 'react-router-dom'

type newRecord = Omit<IDataList, 'id'>
type Props = {
    onTrue: () => void;
    onClose: () => void;
}

const AddForm = ({ onTrue, onClose }: Props) => {

    const [payeeName, setPayeeName] = useState<string>('');
    const [product, setProduct] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [date, setDate] = useState<string>(setDefaultDate);

    const { url } = useParams();
    const navigate = useNavigate();

    let tempRecord: newRecord = {
        payeeName: payeeName,
        product: product,
        price: price,
        setDate: date
    }

    const getPayeeName = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPayeeName(event.target.value);
    }

    const getProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct(event.target.value);
    }

    const getPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt("0" + event.target.value));
    }


    const getDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    }

    function setDefaultDate() {
        const today = new Date();
        return (
            today.getFullYear() + "-"
            + ("0" + (today.getMonth() + 1)).slice(-2) + "-"
            + ("0" + today.getDate()).slice(-2)
        );
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = await pushDataToServer(tempRecord);
        (url === 'add') ? navigate('/') : onTrue()
    }

    return (
        <>
            <section>
                <header>
                    <h1>Add New Item</h1>
                    <p>
                        Read the below instructions before proceeding:<br />
                        Make sure to fill all the fields marked as *
                    </p>
                </header>
                <form onSubmit={submitHandler}>
                    <article>
                        <p>Name</p>
                        <select name="Name" value={payeeName} onChange={getPayeeName} required>
                            <option value="" defaultChecked>Choose</option>
                            <option value="Rahul">Rahul</option>
                            <option value="Ramesh">Ramesh</option>
                        </select>
                    </article>
                    <article>
                        <p>Product Purchased</p>
                        <input type="text" value={product} onChange={getProduct} required />
                    </article>
                    <article>
                        <p>Price</p>
                        <input type="number" value={price} onChange={getPrice} pattern=' /^\d+\.\d{0,2}$/' required />
                    </article>
                    <article>
                        <p>Date</p>
                        <input type="date" value={date} onChange={getDate} required />
                    </article>

                    {(url === "add") ?
                        (
                            <button type="submit" className="form-button">Submit</button>

                        ) : (
                            <>
                                <button type="button" className="form-button" onClick={onClose}>Close</button>
                                <button type="submit" className="form-button">Submit</button>
                            </>
                        )
                    }
                </form>
            </section>
        </>
    )
}

export default AddForm;