import React, { useState } from 'react'
import IDataList from '../models/IDataList'
import { pushDataToServer } from '../services/Menu'

type newRecord = Omit<IDataList, 'id'>
type Props = {
    onTrue: () => void;
    onClose: () => void;
}

const AddForm = ({ onTrue, onClose }: Props) => {

    const [payeeName, setPayeeName] = useState<string>('');
    const [product, setProduct] = useState<string>('');
    const [price, setPrice] = useState<string>('0');
    const [date, setDate] = useState<string>(setDefaultDate);
    const [nameError, setNameError] = useState<string>('')
    const [productError, setProductError] = useState<string>('')
    const [priceError, setPriceError] = useState<string>('')
    const [dateError, setDateError] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(false)

    let tempRecord: newRecord = {
        payeeName: payeeName,
        product: product,
        price: price,
        setDate: date
    }

    const getPayeeName = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPayeeName(event.target.value);
        console.log(event.target.value)
    }

    const getProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct(event.target.value);
        
    }

    const getPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pricePattern = /^\d+(\.\d{1,2})?$/;

        setPrice(event.target.value);

        if (price === '') {
            setPriceError('Please specify the price of product');
            setIsValid(false)

        } else {
            if (!pricePattern.test(price)) {
                setPriceError('Price needs to be a valid currency value!');
                setIsValid(false)
            }
        }
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

    const validate = () => {
        const { payeeName, product, price, setDate } = tempRecord;
        const pricePattern = /^\d+(\.\d{1,2})?$/;

        setIsValid(true)

        if (payeeName === '') {
            setNameError('Please specify payee name');
            setIsValid(false)
        }

        if (product === '') {
            setProductError('Please specify product name');
            setIsValid(false)
        }

        if (price === '') {
            setPriceError('Please specify the price of product');
            setIsValid(false)

        } else {
            if (!pricePattern.test(price)) {
                setPriceError('Price needs to be a valid currency value!');
                setIsValid(false)
            }
        }

        return isValid;
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validate()) {
            const data = await pushDataToServer(tempRecord);
            onTrue();
        }
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
                        <span className='errorMsg'>{nameError}</span>
                    </article>
                    <article>
                        <p>Product Purchased</p>
                        <input type="text" value={product} onChange={getProduct} required />
                        <span className='errorMsg'>{productError}</span>
                    </article>
                    <article>
                        <p>Price</p>
                        <input type="number" value={price} onChange={getPrice} pattern=' /^\d+\.\d{0,2}$/' required />
                        <span className='errorMsg'>{priceError}</span>
                    </article>
                    <article>
                        <p>Date</p>
                        <input type="date" value={date} onChange={getDate} required />
                        <span className='errorMsg'>{dateError}</span>
                    </article>

                    <button type="button" className="form-button" onClick={onClose}>Close</button>
                    <button type="submit" className="form-button">Submit</button>
                </form>
            </section>
        </>
    )
}

export default AddForm;
