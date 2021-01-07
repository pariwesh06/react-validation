import React, { Component } from "react";
import "./Form.css";
export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            fname: '',
            age: '',
            formErrors: { fname: '' },
            fnameValid: false,
            ageValid: false
        }
    }
    handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        }, () => this.validateField(name, value));
    }
    validateField(fieldName, value) {
        let fnameValid = this.state.fnameValid;
        let ageField = this.state.ageValid;
        switch (fieldName) {
            case 'fname':
                fnameValid = value.length >= 3;
                this.state.formErrors.fname = fnameValid ? '' : ' is invalid';
                break;
            case 'age':
                ageField = value > 0;
                this.state.formErrors.age = ageField ? '' : ' is invalid';
        }
        this.setState({
            formErrors: this.state.formErrors,
            fnameValid: fnameValid,
            ageValid: ageField
        })
    }
    render() {
        return (
            <form className='form'>
                <input value={this.state.fname} onChange={this.handleInput} className='form-control' name='fname' required></input>
                <input value={this.state.age} placeholder='Age' onChange={this.handleInput} name='age'></input>
                <button>Save</button>
                <FormErrors errors={this.state.formErrors}></FormErrors>
            </form>
        )
    }
}

function FormErrors({ errors }) {
    return (
        <div>
            {Object.keys(errors).map((fieldName, index) => {
                return (
                    <p className='error'>{fieldName} {errors[fieldName]}</p>
                )
            })}
        </div>
    )
} 