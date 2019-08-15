import React, { Component } from "react"
import './styles.css'
import { Form, Button, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import TravelmemoriesText from '../../components/TravelmemoriesText/index'
import Header from './Header'

axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredential = true

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function checkpassWord(str) {
    if (str.length < 8) {
        return ("Le mot de passe doit être au moins de 8 caractères.")
    }
    else if (str.length > 20) {
        return ("Le mot de passe ne doit pas être de plus de 20 caractères.")
    }
    else if (str.search(/\d/) === -1) {
        return ("Le mot de passe doit contenir des chiffres et des lettres.")
    }
    else if (str.search(/[A-Z]/) === -1) {
        return ("Le mot de passe doit contenir au moins une majuscule.")
    }
    else if (str.search(/[a-zA-z=Z]/) === -1) {
        return ("Le mot de passe doit contenir des chiffres et des lettres.")
    }
    else {
        return "OK"
    }
}

function checkCharsOnly(str) {
    return str.search(/\d/) === -1;
}

function checkEmail(email) {
    let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email)
}

class Connexion extends Component {
    constructor() {
        super()
        this.state = {
            birthDay: '',
            birthMonth: '',
            birthYear: '',
            email: '',
            emailConfirm: '',
            emailConfirmLabel: ' ',
            name: '',
            firstName: '',
            password: '',
            passwordConfirm: '',
            passwordConfirmLabel: '',
            emailDisabled: true,
            pwdDisabled: true,
            sex: '',
            validPassword: false,
            invalidPassword: false,
            passwordMessage: '',
            validEmail: false,
            invalidEmail: false,
            emailMessage: '',
            validName: false,
            invalidName: false,
            validFirstName: false,
            invalidFirstName: false,
            validPasswordConfirm: false,
            invalidPasswordConfirm: false,
            validEmailConfirm: false,
            invalidEmailConfirm: false,
            generalMessage: '',
            allChecked: false,
            recaptchaResponse: '',
            buttonValue: 'Inscription',
            generalMessageStyle: { color: 'red' },
            buttonVariance: 'primary',
            buttonDisabled: false
        }

        this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);
    }

    handleCaptchaResponseChange(response) {
        this.setState({
            recaptchaResponse: response,
        })
    }

    handleChange(evt) {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        }, () => {
            switch (name) {
                case 'password':
                    if (checkpassWord(this.state.password) === "OK") {
                        this.setState({ validPassword: true, invalidPassword: false, pwdDisabled: false, passwordConfirmLabel: 'Confirmation mot de passe', passwordMessage: '' })
                    }
                    else {
                        this.setState({ validPassword: false, invalidPassword: true, pwdDisabled: true, passwordConfirmLabel: ' ', passwordConfirm: '', passwordMessage: checkpassWord(this.state.password), validPasswordConfirm: false, invalidPasswordConfirm: true })
                    }
                    break;
                case 'passwordConfirm':
                    if (this.state.passwordConfirm === this.state.password) {
                        this.setState({ validPasswordConfirm: true, invalidPasswordConfirm: false, passwordMessage: '' })
                    }
                    else {
                        this.setState({ validPasswordConfirm: false, invalidPasswordConfirm: true, passwordMessage: 'Les mots de passe ne correspondent pas.' })
                    }
                    break;
                case 'email':
                    if (checkEmail(this.state.email)) {
                        this.setState({ validEmail: true, invalidEmail: false, emailDisabled: false, emailConfirmLabel: 'Confirmation adresse e-mail', emailMessage: '' })
                    }
                    else {
                        this.setState({ validEmail: false, invalidEmail: true, emailDisabled: true, emailConfirmLabel: ' ', emailConfirm: '', emailMessage: 'Adresse e-mail non valide.', validEmailConfirm: false, invalidEmailConfirm: true })
                    }
                    break;
                case 'emailConfirm':
                    if (this.state.email === this.state.emailConfirm) {
                        this.setState({ validEmailConfirm: true, invalidEmailConfirm: false, emailMessage: '' })
                    }
                    else {
                        this.setState({ validEmailConfirm: false, invalidEmailConfirm: true, emailMessage: 'Les adresses e-mail ne correspondent pas.' })
                    }
                    break;
                case 'name':
                    if (!isEmptyOrSpaces(this.state.name) && checkCharsOnly(this.state.name)) {
                        this.setState({ validName: true, invalidName: false })
                    }
                    else {
                        this.setState({ validName: false, invalidName: true })
                    }
                    break;
                case 'firstName':
                    if (!isEmptyOrSpaces(this.state.firstName) && checkCharsOnly(this.state.firstName)) {
                        this.setState({ validFirstName: true, invalidFirstName: false })
                    }
                    else {
                        this.setState({ validFirstName: false, invalidFirstName: true })
                    }
                    break;
            }
        })
    }

    handleClick() {
        var self = this;
        this.setState({ generalMessage: <Spinner animation="border" variant="warning" /> })
        if (self.state.validName && self.state.validFirstName && self.state.validEmail && self.state.validEmailConfirm && self.state.validPassword
            && self.state.validPasswordConfirm && !isEmptyOrSpaces(self.state.birthDay) && !isEmptyOrSpaces(self.state.birthMonth) && !isEmptyOrSpaces(self.state.birthYear)
            && !isEmptyOrSpaces(self.state.sex)) {
            setTimeout(function () {
                axios.post('user', {
                    'name': self.state.name,
                    'firstName': self.state.firstName,
                    'email': self.state.email,
                    'password': self.state.password,
                    'birthYear': self.state.birthYear,
                    'birthMonth': self.state.birthMonth,
                    'birthDay': self.state.birthDay,
                    'sex': self.state.sex,
                    'captcha': self.state.recaptchaResponse
                })
                    .then(function (response) {
                        if (response.data.success === false) {
                            self.setState({ generalMessage: response.data.message })
                        }
                        else {
                            self.setState({
                                generalMessage: 'Inscription validée avec succès. Connectez vous !',
                                generalMessageStyle: { color: 'green' },
                                buttonVariance: 'success',
                                buttonDisabled: true
                            })
                        }
                    })
            }, 3000)
        }
        else {
            self.setState({ generalMessage: 'Vous devez valider tous les champs pour pouvoir vous inscrire.' })
        }
    }

    daysOption() {
        var days = [];

        for (let i = 1; i <= 31; i++) {
            if (i < 10) {
                i = "0" + i;
            }
            days.push(<option key={i} value={i}>{i}</option>)
        }

        return days;
    }

    yearsOption() {
        var years = [];
        let currentYear = new Date().getFullYear();

        for (let i = 0; i <= 120; i++) {
            years.push(<option key={i} value={currentYear - i}>{currentYear - i}</option>)
        }

        return years;
    }

    render() {
        return (
            <div className="mainContainer">
                <Header />
                <div className="leftContainer">
                    <div className="leftHeader"> 
                        <TravelmemoriesText />
                    </div>
                    <div className="leftBody">
                        <div className="Title">
                            <div>
                                <div id="title" className="text-center">
                                    <h3>Bienvenue sur TravelMemories, l'outil parfait des globe-trotteurs !</h3>
                                </div>
                                <div id="title2" className="text-center">
                                    <h4>Inscrivez-vous, cela ne prend que quelques secondes et c'est <b>gratuit</b> !</h4>
                                </div>
                            </div>


                        </div>
                        <div className="formContainer">
                        <Form className="form-body">
                            <Form.Row className="firstRow">
                                <Form.Group className="col-md-4 offset-md-2" as={Col}>
                                    <Form.Label>Nom</Form.Label>
                                    <div className="input-group mb-3">
                                        <Form.Control 
                                            className="text-center" 
                                            name="name" 
                                            value={this.state.name} 
                                            type="text" 
                                            placeholder="Nom" 
                                            onChange={(evt) => this.handleChange(evt)}/>
                                        <div hidden={!this.state.validName} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="green" icon="check" /></span>
                                        </div>
                                        <div hidden={!this.state.invalidName} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="red" icon="check" /></span>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="col-md-4" as={Col}>
                                    <Form.Label>Prénom</Form.Label>
                                    <div className="input-group mb-3">
                                        <Form.Control className="text-center" name="firstName" value={this.state.firstName} type="text" placeholder="Prénom" onChange={(evt) => this.handleChange(evt)} />
                                        <div hidden={!this.state.validFirstName} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="green" icon="check" /></span>
                                        </div>
                                        <div hidden={!this.state.invalidFirstName} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="red" icon="check" /></span>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group className="col-md-4 offset-md-2" as={Col}>
                                    <Form.Label>Adresse e-mail</Form.Label>
                                    <div className="input-group mb-3">
                                        <Form.Control className="text-center" name="email" value={this.state.email} type="email" placeholder="Adresse e-mail" onChange={(evt) => this.handleChange(evt)} />
                                        <div hidden={!this.state.validEmail} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="green" icon="check" /></span>
                                        </div>
                                        <div hidden={!this.state.invalidEmail} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="red" icon="check" /></span>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="col-md-4" as={Col}>
                                    <Form.Label>{this.state.emailConfirmLabel}</Form.Label>
                                    <div hidden={this.state.emailDisabled} className="input-group mb-3">
                                        <Form.Control className="text-center" name="emailConfirm" value={this.state.emailConfirm} type="email" placeholder="Confirmez l'adresse e-mail" onChange={(evt) => this.handleChange(evt)} />
                                        <div hidden={!this.state.validEmailConfirm} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="green" icon="check" /></span>
                                        </div>
                                        <div hidden={!this.state.invalidEmailConfirm} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="red" icon="check" /></span>
                                        </div>
                                    </div>
                                </Form.Group>
                                <div className="col-md-12 errMess">
                                    {this.state.emailMessage}
                                </div>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group className="col-md-4 offset-md-2" as={Col}>
                                    <Form.Label>Mot de passe</Form.Label>
                                    <div className="input-group mb-3">
                                        <Form.Control className="text-center" name="password" type="password" value={this.state.password} placeholder="Choisissez un nouveau mot de passe" onChange={(evt) => this.handleChange(evt)} />
                                        <div hidden={!this.state.validPassword} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="green" icon="check" /></span>
                                        </div>
                                        <div hidden={!this.state.invalidPassword} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="red" icon="check" /></span>
                                        </div>
                                    </div>
                                </Form.Group>

                                <Form.Group className="col-md-4" as={Col}>
                                    <Form.Label>{this.state.passwordConfirmLabel}</Form.Label>
                                    <div hidden={this.state.pwdDisabled} className="input-group mb-3">
                                        <Form.Control value={this.state.passwordConfirm} className="text-center" name="passwordConfirm" type="password" placeholder="Confirmez le mot de passe" onChange={(evt) => this.handleChange(evt)} />
                                        <div hidden={!this.state.validPasswordConfirm} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="green" icon="check" /></span>
                                        </div>
                                        <div hidden={!this.state.invalidPasswordConfirm} className="input-group-append">
                                            <span className="input-group-text"><FontAwesomeIcon className="red" icon="check" /></span>
                                        </div>
                                    </div>
                                </Form.Group>
                                <div className="col-md-12 errMess">
                                    {this.state.passwordMessage}
                                </div>
                            </Form.Row>

                            <Form.Row>
                                <div className="col-md-12 text-center form-label birthdateLabel">Date de naissance</div>
                                <Form.Group className="col-md-2 offset-md-3">
                                    <select className="form-control" name="birthDay" onChange={(evt) => this.handleChange(evt)}>
                                        <option value="">Jour</option>
                                        {this.daysOption()}
                                    </select>
                                </Form.Group>
                                <Form.Group className="col-md-2">
                                    <select name="birthMonth" className="form-control" onChange={(evt) => this.handleChange(evt)}>
                                        <option value="">Mois</option>
                                        <option value="01">Janvier</option>
                                        <option value="02">Février</option>
                                        <option value="03">Mars</option>
                                        <option value="04">Avril</option>
                                        <option value="05">Mai</option>
                                        <option value="06">Juin</option>
                                        <option value="07">Juillet</option>
                                        <option value="08">Août</option>
                                        <option value="09">Septembre</option>
                                        <option value="10">Octobre</option>
                                        <option value="11">Novembre</option>
                                        <option value="12">Décembre</option>
                                    </select>
                                </Form.Group>
                                <Form.Group className="col-md-2">
                                    <select className="form-control" name="birthYear" onChange={(evt) => this.handleChange(evt)}>
                                        <option value="">Année</option>
                                        {this.yearsOption()}
                                    </select>
                                </Form.Group>
                                <small id="ageHelp" className="col-md-6 offset-md-3 text-muted">Votre âge permet de vous proposer un contenu adapté.</small>
                            </Form.Row>

                            <Form.Row>
                                <div className="col-md-12 text-center form-label">Sexe</div>
                                <Form.Group className="col-md-12">
                                    <Form.Check
                                        inline
                                        type="radio"
                                        value="F"
                                        label="Femme"
                                        name="sex"
                                        onChange={(evt) => this.handleChange(evt)}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        value='M'
                                        label="Homme"
                                        name="sex"
                                        onChange={(evt) => this.handleChange(evt)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <div>
                                <small id="conditions" className="form-text text-muted">En cliquant sur Inscription, vous acceptez nos <Link to="/conditions">Conditions</Link> et indiquez que vous avez lu notre <Link to="/dataUsing">Politique d’utilisation des données</Link>, ainsi que celle d'<Link to="/cookieUsing">utilisation des cookies</Link>. Vous pouvez vous désinscrire de Travel Memories à tout moment. Vos données ne seront pas sauvegardées, conformément aux règles européeennes de RGPD.</small>
                            </div>

                            <ReCAPTCHA
                                align="center"
                                ref="recaptcha"
                                sitekey="6LcyQ6gUAAAAAJ5KmJhaXrOefFKYNwVt2H4i6Ooj"
                                onChange={this.handleCaptchaResponseChange}
                            />

                            <div style={this.state.generalMessageStyle} className="col-md-12 generalMess">
                                {this.state.generalMessage}
                            </div>
                            <Button disabled={this.state.buttonDisabled} className="col-md-2 registerButton" variant={this.state.buttonVariance} onClick={() => this.handleClick()}>
                                {this.state.buttonValue}
                            </Button>
                    </Form>
                        </div>
                    </div>
                    <div className="leftFooter">

                    </div>
                </div>
                <div className="rightContainer">

                </div>
            </div >
        )
    }
}

export default Connexion