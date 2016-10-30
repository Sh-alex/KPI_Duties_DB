import React, {Component} from "react";
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap'

import "./styles.less";

export default class CtrlDcBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingInpIsShown: false,
            shownList: "OCCUP_GROUP" // CLARIFICATION, CODE_KP, CODE_ZKPPTR, CODE_ETDK, CODE_DKHP, RESPONSIBILITIES, HAVE_TO_KNOW, QUALIFF_REQUIR
        };

        this.showAddingInp = this.showAddingInp.bind(this);
        this.hideAddingInp = this.hideAddingInp.bind(this);
    }

    componentDidMount() {
        //this.props.fetchLists();
    }

    componentWillReceiveProps(nextProps) {
    }

    showAddingInp(e) {
        this.setState({addingInpIsShown: true})
    }

    hideAddingInp(e) {
        this.setState({addingInpIsShown: false})
    }

    render() {
        let listIsEmpty = this.state.shownList == "CLARIFICATION",   //TODO: поміняти умову
            shownOccupDescrTextsList = ["RESPONSIBILITIES", "HAVE_TO_KNOW", "QUALIFF_REQUIR"].includes(this.state.shownList),
            mainHeader = document.getElementsByClassName("main-header"),
            mainHeaderH = mainHeader.length && mainHeader[0].clientHeight || 73,
            mainFooter = document.getElementsByClassName("main-footer"),
            mainFooterH = mainFooter.length && mainFooter[0].clientHeight || 82,
            ctrlDcBoxMenu = document.getElementsByClassName("ctrl-dc-box-menu"),
            marginTop = 20,
            marginBottom = 20,
            calcContainerH = window.innerHeight - marginTop - marginBottom - mainHeaderH - mainFooterH,
            ctrlDcBoxMenuH = ctrlDcBoxMenu.length && ctrlDcBoxMenu[0].clientHeight || 1,
            resTblMaxHeight = Math.max(...[calcContainerH, ctrlDcBoxMenuH, 200]),
            //TODO: коли реалізовуватиму рендерінг на основі переданих даних, обирати просто який тип TR рендерити, а не всієї таблиці
            CtrlDcBoxResTbl = shownOccupDescrTextsList ? (
                <div className="ctrl-occup-dc-table-wrapper">
                    <table className="table table-hover table-condensed ctrl-occup-dc-table">
                        {/*<thead>*/}
                        {/*<tr>*/}
                        {/*<th title="Номер в списку">*/}
                        {/*№*/}
                        {/*</th>*/}
                        {/*<th className="th-sorting sorting_asc" >*/}
                        {/*Назва*/}
                        {/*</th>*/}
                        {/*<th> Дії </th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
                        <tbody>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                1
                            </td>
                            <td className="big-text-cell--folded">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-down`}/>
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                2
                            </td>
                            <td className="">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-up`}/>
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                3
                            </td>
                            <td className="big-text-cell--folded">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-down`}/>
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                4
                            </td>
                            <td className="big-text-cell--folded">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-down`}/>
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                5
                            </td>
                            <td className="big-text-cell--folded">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-down`}/>
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                6
                            </td>
                            <td className="big-text-cell--folded">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-down`}/>
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                7
                            </td>
                            <td className="big-text-cell--folded">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-down`}/>
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="" title="Номер в списку">
                                8
                            </td>
                            <td className="big-text-cell--folded">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci amet animi architecto, asperiores cupiditate dicta doloremque doloribus dolorum ea est eum expedita hic id illum iusto labore magni maxime minima molestiae mollitia nemo nisi, nostrum numquam obcaecati optio perferendis possimus quisquam quos saepe sed sit soluta tenetur ut velit veritatis voluptate? Ab eius eveniet in ipsum iusto nesciunt perferendis quis sed sint suscipit! A accusamus accusantium alias aliquid at delectus dolore dolorem ea est ex fugiat in iure iusto labore laudantium, maiores nam, natus necessitatibus obcaecati officiis porro quae quasi quidem quos reiciendis repellendus similique soluta tempora tenetur, unde.
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn btn-expand"
                                    title="Переглянути деталі"
                                >
                                    <i className={`fa fa-chevron-down`}/>
                                </a>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="ctrl-occup-dc-table-wrapper">
                    <table className="table table-hover table-condensed ctrl-occup-dc-table">
                        {/*<thead>*/}
                        {/*<tr>*/}
                        {/*<th title="Номер в списку">*/}
                        {/*№*/}
                        {/*</th>*/}
                        {/*<th className="th-sorting sorting_asc" >*/}
                        {/*Назва*/}
                        {/*</th>*/}
                        {/*<th> Дії </th>*/}
                        {/*</tr>*/}
                        {/*</thead>*/}
                        <tbody>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                1
                            </td>
                            <td className="">
                                Керівники
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a> {" "}
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                2
                            </td>
                            <td className="">
                                Професіонали
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a>
                            </th>
                        </tr>
                        <tr className="row--details">
                            <td className="" colSpan="10">
                                <div>
                                    <i> Посади що використовують це значення: </i>
                                </div>
                                <div className="list-of-using-occup">
                                    <a title="Натисніть щоб відредагувати посаду" href="#"> Інженер </a>,
                                    <a href="#"> Інженер 1 категорії </a>,
                                    <a href="#"> Інженер 2 категорії </a>,
                                    <a href="#"> Головний інженер </a>,
                                    <a href="#"> Старший інженер </a>,
                                    <a href="#"> Молодший інженер </a>
                                </div>
                            </td>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                3
                            </td>
                            <td className="">
                                Фахівці
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                4
                            </td>
                            <td className="">
                                Технічні службовці
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                5
                            </td>
                            <td className="">
                                Працівники сфери торгівлі та послуг
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                6
                            </td>
                            <td className="">
                                Кваліфікаційні робітники
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-muted disabled"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a>
                            </th>
                        </tr>
                        <tr className="row--short-info">
                            <td className="text-center" title="Номер в списку">
                                7
                            </td>
                            <td className="">
                                Найпростіші професії
                            </td>
                            <th className="text-right action-btns-cell">
                                <a
                                    className="action-btns-cell__btn text-muted"
                                    title="Посади що використовують це значення"
                                >
                                    <i className="fa fa-link" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-warning"
                                    title="Редагувати елемент"
                                >
                                    <i className="fa fa-edit" />
                                </a> {" "}
                                <a
                                    className="action-btns-cell__btn text-danger disabled"
                                    title="Видалити елемент зі списку"
                                >
                                    <i className={`fa fa-trash`} />
                                </a>
                            </th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            ),
            msgListIsEmpty = (
                <Alert bsStyle="warning">
                    <p>
                        Список поки що пустий :( <br/>
                        Але ви можете додати сюди нові значення.
                    </p>
                </Alert>
            ),
            inpNewVal = (
                <div className="input-group">
                    {
                        shownOccupDescrTextsList ? (
                            <textarea
                                className="form-control"
                                placeholder="Нове значення у списку"
                                title="Введіть тут нове значення щоб додати його до списку"
                                rows="6" />
                        ) : (
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Нове значення у списку"
                                title="Введіть тут нове значення щоб додати його до списку" />
                        )
                    }
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-default btn-flat" title="Додати введене значення до списку">
                            {/*Додати*/}
                            <i className="fa fa-save"/>
                        </button>
                        {shownOccupDescrTextsList && <br/>}
                        <button
                            type="button"
                            className="btn btn-default btn-flat"
                            title="Відмінити додавання нового значення"
                            onClick={this.hideAddingInp}
                        >
                            <i className="fa fa-close"/>
                        </button>
                    </div>
                </div>
            ),
            btnShowAddingInp = (
                <button
                    type="button"
                    className="btn btn-default btn-sm btn-block btn-show-adding-inp"
                    title="Додати нове значення до списку"
                    onClick={this.showAddingInp}
                >
                    <i className="fa fa-plus"/>
                </button>
            ),
            inpFilterList = (
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Пошук значень у списку" title="Відфільтрувати таблицю по введеному рядку" />
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-default btn-flat" title="Відфільтрувати таблицю по введеному рядку">
                            <i className="fa fa-search"/>
                        </button>
                        <button type="button" className="btn btn-default btn-flat" title="Переключити сортування таблиці">
                            <i className="fa fa-sort-amount-asc"/>
                        </button>
                    </div>
                </div>
            );

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="box box-default ctrl-dc-box-menu">
                            <div className="box-header with-border text-center">
                                <h3 className="box-title"> Списки значень у посадах </h3>
                            </div>
                            <div className="box-body">
                                <ListGroup className="no-margin">
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "OCCUP_GROUP"}
                                        onClick={e => this.setState({shownList: "OCCUP_GROUP"})}
                                    >
                                        Посадовий склад
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "CLARIFICATION"}
                                        onClick={e => this.setState({shownList: "CLARIFICATION"})}
                                    >
                                        Уточнення
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "CODE_KP"}
                                        onClick={e => this.setState({shownList: "CODE_KP"})}
                                    >
                                        Код КП
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "CODE_ETDK"}
                                        onClick={e => this.setState({shownList: "CODE_ETDK"})}
                                    >
                                        Код ЄТДК
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "CODE_ZKPPTR"}
                                        onClick={e => this.setState({shownList: "CODE_ZKPPTR"})}
                                    >
                                        Код ЗКППТР
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "CODE_DKHP"}
                                        onClick={e => this.setState({shownList: "CODE_DKHP"})}
                                    >
                                        Код ДКХП
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "RESPONSIBILITIES"}
                                        onClick={e => this.setState({shownList: "RESPONSIBILITIES"})}
                                    >
                                        Завдання, обов'язки та повноваження
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "HAVE_TO_KNOW"}
                                        onClick={e => this.setState({shownList: "HAVE_TO_KNOW"})}
                                    >
                                        Повинен знати
                                    </ListGroupItem>
                                    <ListGroupItem
                                        href="javascript:void(0)"
                                        active={this.state.shownList == "QUALIFF_REQUIR"}
                                        onClick={e => this.setState({shownList: "QUALIFF_REQUIR"})}
                                    >
                                        Кваліфікаційні вимоги
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="box box-default ctrl-dc-box-res">
                            {/*<div className="box-header with-border text-center">*/}
                            {/*<h3 className="box-title"> Списки </h3>*/}
                            {/*</div>*/}
                            <div className="box-body" style={{maxHeight: resTblMaxHeight + "px"}}>
                                <div>
                                    <form>
                                        <div className="form-group">
                                            { !listIsEmpty && inpFilterList }
                                        </div>
                                    </form>
                                </div>
                                { listIsEmpty ? msgListIsEmpty : CtrlDcBoxResTbl }
                                <div className="btn-show-adding-inp-wrapper">
                                    { this.state.addingInpIsShown ? inpNewVal : btnShowAddingInp }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // ...state.occupationNameInfo,
        // ...state.delOccupation,
        // ...state.searchOccupBox
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchLists() {
            // dispatch(fetchOccupGroupList());
            // dispatch(fetchClarifiedOccupList());
            // dispatch(fetchClarificationList());
        },
    }
};

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CtrlDcBox);
