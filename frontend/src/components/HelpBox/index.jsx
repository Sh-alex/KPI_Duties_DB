import React, { Component } from 'react'
import './styles.less'
import {Accordion, Panel} from 'react-bootstrap'
import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import img4 from "./img/img4.jpg";
import img5 from "./img/img5.jpg";
import img6 from "./img/img6.jpg";
import img7 from "./img/img7.jpg";
import img8 from "./img/img8.jpg";
import img9 from "./img/img9.jpg";
import img10 from "./img/img10.jpg";
import img11 from "./img/img11.jpg";
import img12 from "./img/img12.jpg";

export default class HelpBox extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="box box-default">
                <div className="box-header with-border text-center">
                    <h3 className="box-title"> Керівництво користувачу </h3>
                </div>
                <div className="box-body">
                    <Accordion className="accordion accordion--help">
                        <Panel header="1. Системні вимоги" eventKey="1">
                            <p>
                                Для роботи додатку необхідне мережеве з’єднання комп’ютера із сервером та веб-браузер Opera, Mozilla Firefox, чи Google Chrome останньої версії. Коректність роботи гарантується у браузері Google Chrome версій 50-55.
                            </p>
                        </Panel>
                        <Panel header="2. Загальний опис функціональності" eventKey="2">
                            <p>
                                Додаток має 4 основних сторінки із можливістю навігації між ними:
                            </p>
                            <ul>
                                <li>
                                    сторінка авторизації, де неавторизованим користувачам показується форма авторизації, а авторизованим – меню для навігації між сторінками.
                                </li>
                                <li>
                                    сторінка додавання посад
                                </li>
                                <li>
                                    сторінка контролю списків
                                </li>
                                <li>
                                    сторінка пошуку посад
                                </li>
                            </ul>
                            <p>
                                В залежності від прав доступу користувача, деякі з цих сторінок будуть йому недоступними, а при спробі відкрити сторінку доступ до якої користувачу заборонено, його буде перенаправлено на сторінку авторизації і виведено відповідне повідомлення.
                            </p>
                            <p>
                                У всіх станах (крім процесу авторизації користувача із відображуваною на екрані лише формою для авторизації) на екрані є компоненти із
                            </p>
                            <ul>
                                <li>
                                    «Шапкою» (Header), де розміщується логотип додатку, навігаційне меню та піктограма авторизованого користувача з випадаючою кнопкою для виходу із системи.
                                </li>
                                <li>
                                    Блок із основною активною формою (для додавання посад, пошуку, тощо)
                                </li>
                                <li>
                                    «Нижнім колонтитулом»(Footer) у якому розміщено інформацію про розробників програмного продукту
                                </li>
                            </ul>
                        </Panel>
                        <Panel header="3. Реєстрація нових користувачів" eventKey="3">
                            <p>
                                Реєстрацією нових користувачів уповноважений займатися тільки системний адміністратор або адміністратор бази даних. При цьому якщо ви бажаєте встановити/змінити ваш персональний логін – для цього теж необхідно звернутися до системного адміністратора або адміністратора БД, який додасть/змінить ваші персональні дані в БД та назначить вам небхідні права доступу.
                            </p>
                            <p>
                                Після отримання комбінації логін/пароль від адміністраторів особисто або в електронному листі ви маєте доступ до додатку.
                            </p>
                        </Panel>
                        <Panel header="4. Вхід у систему" eventKey="4">
                            <p>
                                <b>
                                    Без реалізації попереднього пункту(отримання вашого логіна та пароля від уповноваженої особи) вхід у програму не є можливим.
                                </b>
                            </p>
                            <p>
                                Для роботи із додатком необхідно авторизуватися. Доступ неавторизованим користувачам заборонено.
                            </p>
                            <p>
                                У разі, якщо ви правильно ввели дані (логін та пароль), завантажаться дані про вас і замість форми авторизації з’явиться меню навігації для переходу до форм додавання, пошуку посад, контролю списків даних які використовуютьс посадами та виходу із системи.
                            </p>
                            <p>
                                Якщо у полях для авторизації було допущено помилку, логін/пароль не вірні, нема мережевого з’єднання, чи сталася помилка на сервері система виведе відповідне повідомлення.
                            </p>
                        </Panel>
                        <Panel header="5. Вихід із аккаунта" eventKey="5">
                            <p>
                                Для виходу із аккаунта потрібно натиснути на кнопку з текстом "Вихід з аккаунта":
                            </p>
                            <p> a) В меню домашньої сторінки </p>
                            <p className="text-center">
                                <img src={img1} className="img-responsive img-thumbnail" alt="Рисунок 5а" />
                            </p>
                            <br/>
                            <p>
                                б) У випадаючому меню(щоб воно з'явилось потрібно натиснути на ім'я користувача) під іменем користувача у "Шапці" (верхній панелі) додатку
                            </p>
                            <p className="text-center">
                                <img src={img2} className="img-responsive img-thumbnail" alt="Рисунок 5б" />
                            </p>
                        </Panel>
                        <Panel header="6. Додавання посад" eventKey="6">
                            <p>
                                Додавання посад відбувається на відповідній формі, перейти до якої можна за допомогою навігаційного меню, або за адресою <a href="/add"> ==Посилання на сторінку додавання посад== </a>.
                            </p>
                            <p>
                                Ця форма має текстові поля для введення усіх даних про посаду. Тут частину даних можна ввести як вручну, так і взяти значення із списків-словників, які підвантажуються із сервера.
                            </p>
                            <p>
                                Тексти з описом посади(завдання, обов'язки та повноваження, повинен знати, кваліфікаційні вимоги), та коди можна додати із інших посад у відповідному модальному вікні для цього треба натиснути на кнопку з піктограмою<i className="fa fa-link" />.
                            </p>
                            <p className="text-center">
                                <img src={img3} className="img-responsive img-thumbnail" alt="Рисунок 6.1" />
                            </p>
                            <p>
                                Відкриється модальне вікно з пошуковою формою. Користувач може знайти там інші посади та обрати необхідне значення, після чого це значення підставиться у відповідне поле на формі додавання.
                            </p>
                            <p>
                                Так як кожна посада могла у різні терміни своєї дії мати різні набори кодів та текстів з описами, на формі можна додавати чи видаляти декілька наборів з відповідними полями. Для додавання ще 1 набору кодів, чи тексту потрібно натиснути на кнопку з піктограмою «+» під іншими полями цієї секії, а для видалення 1 із порцій, треба натиснути на кнопку з піктограмою «х» у правому верхньому кутку відповідної порції полів.
                            </p>
                            <p className="text-center">
                                <img src={img4} className="img-responsive img-thumbnail" alt="Рисунок 6.2" />
                            </p>
                            <br/>
                            <p>
                                У полях для дат їх можна ввести як вручну, так і додати зі зручного віджета-календаря.
                            </p>
                            <p className="text-center">
                                <img src={img5} className="img-responsive img-thumbnail" alt="Рисунок 6.3" />
                            </p>
                            <br/>
                            <p>
                                Перед відправкою даних на сервер проводиться валідація введених даних та виведення підказок користувачеві про наявні помилки.
                            </p>
                        </Panel>
                        <Panel header="7. Пошук, перегляд посад" eventKey="7">
                            <p>
                                Для пошуку та перегляду посад треба перейти на відповідну сторінку за допомогою навігаційного меню, або за адресою <a href="/search"> ==Посилання на сторінку додавання посад== </a>.
                            </p>
                            <p>
                                Форма пошуку посад розроблялася з метою зробити пошук посад максимально гнучким,
                                що було досягнуто завдяки можливості обирати:
                                <ul>
                                    <li>
                                        посадовий склад(усі, або декілька значень обираючи варіанти із відповідного журнального списку),
                                    </li>
                                    <li>
                                        приналежність посади(лише в КПІ, лише в державі, чи будь-які),
                                    </li>
                                    <li>
                                        проміжки у яких лежать дати створення та припинення дії посад,
                                    </li>
                                    <li>
                                        а також можливості обирати як проводитиметься перевірка імені посади у пошуку:
                                        <ul>
                                            <li>
                                                усі посади,
                                            </li>
                                            <li>
                                                точна відповідність або наявність введеного рядка назві посади,
                                            </li>
                                            <li>
                                                наявність хоча б одного, чи всіх ключових слів у назві посади.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </p>
                            <p>
                                При цьому у випадку пошуку по введеному рядку після перключення фокуса із відповідного поля система підказує чи дасть пошук якісь результати, чи ні:
                            </p>
                            <p className="text-center">
                                <img src={img6} className="img-responsive img-thumbnail" alt="Рисунок 7.1" />
                            </p>
                            <p className="text-center">
                                <img src={img7} className="img-responsive img-thumbnail" alt="Рисунок 7.2" />
                            </p>
                            <br/>
                            <p>
                                <b>
                                    Якщо зробити пошук посад при початкових налаштуваннях у формі – виведуться усі посади.
                                </b>
                            </p>
                            <p>
                                Результати пошуку відображаються у таблиці, де рядкам відповідають окремі посади. Таблиця має такі стовпці: № рядка, Посадовий склад,	Назва посади, Створено в державі, Відмінено в державі, Створено в КПІ, Відмінено в КПІ.
                            </p>
                            <p>
                                Щоб переглянути детальну інформацію про посаду, потрібно натиснути на кнопку «Переглянути деталі» із піктограмою <i className="fa fa-chevron-down text-primary" /> з правої сторони рядка цієї посади.
                            </p>
                            <p className="text-center">
                                <img src={img12} className="img-responsive img-thumbnail" alt="Рисунок 7.3" />
                            </p>
                            <br/>
                            <p>
                                Для переключення стортування таблиці потрібно натиснути на заголовок стовпця по якому користувач хоче зробити сортування.
                            </p>
                            <p>
                                Під таблицею з результатами пошуку є випадаючий список для вибору розміру порції(кількості оночасно відображуваних рядків таблиці), меню пагінації(переходу між номерами порцій), кнопка для завантаження результатів пошуку у Excel-файл.
                            </p>
                        </Panel>
                        <Panel header="8. Редагування посад" eventKey="8">
                            <p>
                                Щоб відредагувати інформацію про посаду, необхідно зробити пошук посад.
                                У таблиці з результатами пошуку потрібно натиснути на кнопку з піктограмою <i className="fa fa-edit text-warning" />.
                            </p>
                            <p className="text-center">
                                <img src={img11} className="img-responsive img-thumbnail" alt="Рисунок 8.1" />
                            </p>
                            <br/>
                            <p>
                                Відкриється модальне вікно із заповненими полями форми, що аналогічна формі додавання.
                            </p>
                            <p>
                                При зміні тестів з описом посади з’являється перемикач що дозволяє застосувати зміни тексту також і у всіх посадах що використовують його.
                                Для цього після зміни значення у полі, приберіть фокус із поля - з'явиться кнопка-перемикач із піктограмою <i className="fa fa-fast-forward" />.
                                Щоб текст було змінено у посадах які використовують його, натисніть на цю кнопку-перемикач, піктограма зміниться на <i className="fa fa-check" /> <i className="fa fa-fast-forward" />
                            </p>
                            <p className="text-center">
                                <img src={img9} className="img-responsive img-thumbnail" alt="Рисунок 8.2" />
                            </p>
                            <p className="text-center">
                                <img src={img8} className="img-responsive img-thumbnail" alt="Рисунок 8.3" />
                            </p>
                        </Panel>
                        <Panel header="9. Видалення посад" eventKey="9">
                            <p>
                                Щоб видалити посаду, необхідно зробити пошук посад.
                                У таблиці з результатами пошуку потрібно натиснути на кнопку з піктограмою <i className="fa fa-trash text-danger" /> - з'явиться модальне вікно із підтвердженням видалення.
                            </p>
                            <p className="text-center">
                                <img src={img10} className="img-responsive img-thumbnail" alt="Рисунок 9.1" />
                            </p>
                            <br/>
                            <p>
                                Після натиснення на кнопку «Видалити» у цьому модальному вікні, посаду буде видалено.
                            </p>
                        </Panel>
                        <Panel header="10. Контроль списків" eventKey="10">
                            <p>
                                Для відкриття сторінки контролю списків можна перейти на неї через навігаційне меню, або за адресою <a href="/ctrldict"> ==Посилання на сторінку додавання посад== </a>.
                            </p>
                            <p>
                                Форма контролю списків має меню для вибору списку який користувач хоче переглянути чи відредагувати, та власне таблицю із відповідним списком. На цій формі можна додати нове значення у список, видалити чи відредагувати якесь із існуючих та переглянути які посади використовують певний елемент списку. Також можна відфільтрувати відображені значення списку на наявність у елементах введеного текстового рядка. Можна відсортувати відображений список за алфавітом за зростанням та спаданням значень.
                            </p>
                            <p>
                                Для оновлення списку останніми даним з сервера, потрібно натиснути на кнопку з піктограмою<i className="fa fa-refresh" /> яка розташована зправа від назви списку в меню «Списки значень у посадах».
                            </p>
                        </Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}