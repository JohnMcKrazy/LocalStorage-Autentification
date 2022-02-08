document.addEventListener('DOMContentLoaded', () => {
    //! CONTANTS--START
    //*console.log(JSON.parse(localStorage.getItem('johnlocalStorage')))
    const body = document.querySelector('BODY');

    const selectSectionBtns = document.querySelectorAll('.select_section_btn');
    const modalAlertData = document.querySelector('#modal_alert_data');
    const acceptModalBtn = document.querySelector('#accept_modal_btn');
    const declineModalBtn = document.querySelector('#decline_modal_btn');

    //^^ ********************************************************************************************** *//
    const loginFormContainer = document.querySelector('.login_form_container');
    const btnSelectLogin = document.querySelector('#select_login_btn');
    const btnSelectCreate = document.querySelector('#select_create_btn');

    const nameInputContainer = document.querySelector('#input_name_container');
    const labelInputName = document.querySelector('#label_input_name');
    const userNameInput = document.querySelector('#input_user_name');
    const alertSvgName = document.querySelector('#alert_svg_name');
    const alertMsgName = document.querySelector('#alert_msg_name');

    const emailInputContainer = document.querySelector('#input_email_container');
    const labelInputEmail = document.querySelector('#label_input_email');
    const userEmailInput = document.querySelector('#input_user_email');
    const alertSvgEmail = document.querySelector('#alert_svg_email');
    const alertMsgContainerName = document.querySelector('#alert_msg_container_name');
    const alertMsgEmail = document.querySelector('#alert_msg_email');

    const passwordInputContainer = document.querySelector('#input_password_container');
    const labelInputPassword = document.querySelector('#label_input_password');
    const userPasswordInput = document.querySelector('#input_user_password');
    const showPasswordBtn = document.querySelector('#show_password_btn');
    const alertSvgPassword = document.querySelector('#alert_svg_password');
    const alertMsgPassword = document.querySelector('#alert_msg_password');
    const submitBtn = document.querySelector('.submit_btn');
    //!CONSTANTS--OVER
    //! ************************************************************************ *//
    //^^OPERATOR CONFIGURATION--START
    const close = 'close';
    const open = 'open';
    let passwordStatus = open;
    //^^OPERATOR CONFIGURATION--OVER

    //^^BORDER CONFIG--START
    const redBorder = 'solid 3px red';
    const greenBorder = 'solid 3px forestgreen';
    //^^BORDER CONFIG--OVER

    //^^QUOTES CONFIG--START
    const invalidLoginAll = 'El usuario y/o contraseña no son validos';
    const invalidPasswordShort =
        'La contraseña debe de ser mayor a 6 caracteres y contener al menos una mayuscula y un numero, no debe incluir espacios. ';
    const invalidUserShort = 'El nombre de usuario debe de tener al menos 6 caracteres, incluyendo una mayuscula y un numero.';
    const invalidEmailExist = 'El email de usuario ya existe';
    const invalidUserExist = 'El nombre de usuario ya existe';
    const invalidBlank = 'Este campo necesita llenarse';
    //^^QUOTES CONFIG--OVER

    //^^ICONS CONFIG--START
    const errorIcon =
        '<svg class="alert_error_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Error</title><path class="cls-1"  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg>';
    const okIcon =
        '<svg class="alert_ok_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Valido</title><path class="cls-1" d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/></svg>';

    const openEyed =
        '<svg class="eye_svg" id="eye_open_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Visible</title><path class="cls-1" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3a5 5 0 1 1-4.78 3.527A2.499 2.499 0 0 0 12 9.5a2.5 2.5 0 0 0-1.473-2.28c.466-.143.96-.22 1.473-.22z"/></svg>';
    const closeEyed =
        '<svg class="eye_svg" id="eye_close_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Invisible</title><path class="cls-1" d="M9.342 18.782l-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l1.968-.359C3.903 10.812 7.579 14 12 14c4.42 0 8.097-3.188 8.856-7.39l1.968.358a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0l-.788 2.94z"/></svg>';
    //^^ICONS CONFIG--OVER

    //! VARIANTS--START
    let date = new Date();
    let hour = date.getHours();
    let idResponse;
    let activeLoginSection = 'create';
    let localStorageName = 'johnlocalStorage';
    let localStorageData;
    let currentUniqueID;

    //! VARIANTS--OVER
    //! ************************************************************************ *//
    //!CLASSES--START
    class UserData {
        constructor(user_id, user_name, user_email, user_password) {
            this.user_id = user_id;
            this.user_name = user_name;
            this.user_email = user_email;
            this.user_password = user_password;
        }
    }

    //!CLASSES--OVER
    //! ************************************************************************ *//
    //! OBJECTS & ARRAYS--START
    const letters = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const signs = ['*', '&', '$', '@', '#', '%', '?', '!'];
    const typeOfData = ['letter', 'number', 'sign'];
    let storageForJohnKPage = {
        page_view_count: 1,
        page_alert_status: 'open',
        db_data: {
            user_count: 3,
            user_ids: ['7ts6mio0mg41', 'xvaa57jv7w01', 'h23z652wnal1'],
        },
        user_data: [
            {
                user_id: '7ts6mio0mg41',
                user_name: 'PedroCañaberal',
                user_email: 'pwdro@gmail.com',
                user_password: 'aj86s8n3',
            },
            {
                user_id: 'xvaa57jv7w01',
                user_name: 'JuanitaChula',
                user_email: 'juanita@gmail.com',
                user_password: 'qpwo1029',
            },
            {
                user_id: 'h23z652wnal1',
                user_name: 'JohnMacho',
                user_email: 'john@gmail.com',
                user_password: 'onk39a7s',
            },
        ],
    };
    //TODO ****************************************************************************** *//

    //^^ANIMATION OPACITY TRANSLATE--START
    const animateItemOpacityTranslate = (item, op, tl) => {
        item.style.opacity = op;
        item.style.transform = tl;
        item.style.transition = 'all 1000ms ease';
    };
    const animateItem = (item, op, tt) => {
        item.style.opacity = op;
        item.style.transform = tt;
    };
    //^^ANIMATION OPACITY TRANSLATE--OVER
    //^^ *********************************************************************** *//
    //^^GENERATOR RANDOM DATA--START
    const generateRandom = (arr) => {
        const arrayLenght = arr.length;
        const randomItem = Math.floor(Math.random() * arrayLenght);
        return arr[randomItem];
    };
    //^^GENERATOR RANDOM DATA--OVER
    //^^ *********************************************************************** *//
    //^^CHECK LOCAL STORAGE FOR PAGE DATA--START
    const firstCheckForLocalData = () => {
        let storageContent = JSON.parse(localStorage.getItem(localStorageName));
        if (!storageContent) {
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log('local storage is empty, data is created');
            setTimeout(() => {
                //*animateItem(modalAlertData, '1', 'translateY(0)');
                modalAlertData.style.opacity = '1';
            }, 1000);
        } else if (
            (!storageContent['page_alert_status'] && !storageContent['page_view_count']) ||
            (storageContent['page_alert_status'] && !storageContent['page_view_count']) ||
            (!storageContent['page_alert_status'] && storageContent['page_view_count'])
        ) {
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log('local storage data is remove and create a new one');

            setTimeout(() => {
                modalAlertData.style.opacity = '1';

                //*animateItem(modalAlertData, '1', 'translateY(0)');
            }, 1000);
        } else if (storageContent['page_alert_status'] === open) {
            const getNewLocalData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getNewLocalData;
            storageForJohnKPage['page_view_count'] += 1;
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log(`local storage item answer= ${getNewLocalData['page_alert_status']}, page views= ${getNewLocalData['page_view_count']}`);

            setTimeout(() => {
                //*animateItem(modalAlertData, '1', 'translateY(0)');

                modalAlertData.style.opacity = '1';
            }, 1000);
        } else if (storageContent['page_alert_status'] === close) {
            modalAlertData.style.display = 'none';
            const getNewLocalData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getNewLocalData;
            storageForJohnKPage['page_view_count'] += 1;
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log(`local storage item answer= ${getNewLocalData['page_alert_status']}, page views= ${getNewLocalData['page_view_count']}`);
        }
    };

    firstCheckForLocalData();
    const checkForLocalStorageData = () => {
        let storageContent = JSON.parse(localStorage.getItem(localStorageName));
        if (!storageContent) {
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log('local storage is empty, data is created');
        } else if (
            (!storageContent['page_alert_status'] && !storageContent['page_view_count']) ||
            (storageContent['page_alert_status'] && !storageContent['page_view_count']) ||
            (!storageContent['page_alert_status'] && storageContent['page_view_count'])
        ) {
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log('local storage data is remove and create a new one');
        } else if (storageContent['page_alert_status'] === open) {
            const getNewLocalData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getNewLocalData;
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log(`local storage item answer= ${getNewLocalData['page_alert_status']}, page views= ${getNewLocalData['page_view_count']}`);
        } else if (storageContent['page_alert_status'] === close) {
            const getNewLocalData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getNewLocalData;
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log(`local storage item answer= ${getNewLocalData['page_alert_status']}, page views= ${getNewLocalData['page_view_count']}`);
        }
    };
    //^^CHECK LOCAL STORAGE FOR PAGE DATA--OVER
    //^^ ************************************************************************************************ *//
    //^^ACCEPT BTN--START
    const acceptingStorage = () => {
        let storageContent = JSON.parse(localStorage.getItem(localStorageName));
        if (!storageContent) {
            storageForJohnKPage['page_alert_status'] = close;
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log('local storage is empty, data is created');
            setTimeout(() => {
                //*animateItem(modalAlertData, '0', 'translateY(-50%)');
                modalAlertData.style.opacity = '0';
                setTimeout(() => {
                    modalAlertData.style.display = 'none';
                }, 1500);
            }, 500);
            console.log('creando data desde acepting data modal');
        } else if (storageContent['page_alert_status'] === open) {
            const getNewLocalData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getNewLocalData;
            storageForJohnKPage['page_alert_status'] = close;
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            console.log('cerrando modal y actualizando data');
            setTimeout(() => {
                //*animateItem(modalAlertData, '0', 'translateY(-50%)');
                modalAlertData.style.opacity = '0';
                setTimeout(() => {
                    modalAlertData.style.display = 'none';
                }, 1500);
            }, 500);
        } else if (storageContent['page_alert_status'] === close) {
            console.log('este mensaje jamas debe de salir, si te sale algo esta mal');
        }
    };
    //^^ACCEPT BTN--OVER
    //^^ ************************************************************************************************ *//

    //^^ SET THEME--START
    const changeThemeBtn = document.querySelector('#change_theme_btn');
    const checkTime = () => {
        if (hour < 8 || hour > 20) {
            body.classList.remove('light_theme');
            body.classList.add('dark_theme');
            //*console.log(body.classList);
        } else if (hour >= 8 || hour <= 20) {
            body.classList.remove('dark_theme');
            body.classList.add('light_theme');
        }
    };
    checkTime();
    const changeTheme = () => {
        if (body.className === 'light_theme') {
            body.classList.remove('light_theme');
            body.classList.add('dark_theme');
        } else {
            body.classList.remove('dark_theme');
            body.classList.add('light_theme');
        }
    };
    //^^ SET THEME--OVER
    //^^ ************************************************************************ *//
    //^^ SHOW INPUT PASSWORD--START
    const btnShowPasswordActions = () => {
        const userPasswordInput = document.querySelector('#input_user_password');
        if (passwordStatus === close) {
            showPasswordBtn.innerHTML = openEyed;
            userPasswordInput.setAttribute('type', 'text');
            showPasswordBtn.style.background = 'var(--white)';
            passwordStatus = open;
            //*console.log(passwordStatus);
        } else if (passwordStatus === open) {
            showPasswordBtn.innerHTML = closeEyed;
            userPasswordInput.setAttribute('type', 'password');
            showPasswordBtn.style.background = 'var(--black)';
            passwordStatus = close;
            //*console.log(passwordStatus);
        }
    };
    //^^ SHOW INPUT PASSWORD--OVER
    //^^ ************************************************************************ *//

    //^^CREATE DATE--START
    const createDataDate = () => {
        const date = new Date();
        const dateDay = date.getDay();
        const dateMonth = date.getMonth();
        const dateYear = date.getFullYear();
        console.log(date);
    };
    //^^CREATE DATE--OVER
    //^^ ************************************************************************ *//
    //^^CREATE UNIQUE ID NUMBER--START
    const createNewUniqueArray = () => {
        const createNewUniqueArrayPosition = () => {
            let newTypeOfData = generateRandom(typeOfData);
            if (newTypeOfData === 'number') {
                const newNumber = generateRandom(numbers);

                idResponse = newNumber;
                return idResponse;
            } else if (newTypeOfData === 'letter') {
                const newLetter = generateRandom(letters);
                idResponse = newLetter;
                return idResponse;
            } else if (newTypeOfData === 'sign') {
                const newSign = generateRandom(signs);

                idResponse = newSign;
                return idResponse;
            }
        };
        const uniqueID = `${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}${createNewUniqueArrayPosition()}`;
        return uniqueID;
    };
    //^^CREATE UNIQUE ID NUMBER--OVER
    //^^ ************************************************************************ *//
    //^^CHECK ID DISPONIBILITY--START
    const checkId = (item) => {
        let storageContent = JSON.parse(localStorage.getItem(localStorageName));

        if (!storageContent) {
            console.log('local storage is empty, data is created');
            let newData;
            setNewLocalData(localStorageName, storageForJohnKPage, newData);
            console.log(newData);
            const getUserIds = storageForJohnKPage['db_data']['user_ids'];
            getUserIds.forEach((id) => {
                if (id === item) {
                    console.log(`el id de usuario es =${id}, y el id generado es=${item}`);
                    alert('se repitio un id, se debe de generar uno nuevo automaticamente pero debes de revisar');
                    currentUniqueID = createNewUniqueArray();
                    checkId(currentUniqueID);
                    //*console.log(currentUniqueID);
                } else if (currentUniqueID !== id) {
                    return currentUniqueID;
                } else {
                    console.log(`el id de usuario es =${id}, y el id generado es=${item}`);
                    //*console.log(item);
                    return currentUniqueID;
                }
            });
        } else if (storageContent) {
            const getNewLocalData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getNewLocalData;
            const getUserIds = storageForJohnKPage['db_data']['user_ids'];
            getUserIds.forEach((id) => {
                if (id === item) {
                    console.log(`el id de usuario es =${id}, y el id generado es=${item}`);
                    alert('se repitio un id, se debe de generar uno nuevo automaticamente pero debes de revisar');
                    currentUniqueID = createNewUniqueArray();
                    checkId(currentUniqueID);
                    //*console.log(currentUniqueID);
                } else if (currentUniqueID !== id) {
                    return currentUniqueID;
                } else {
                    console.log(`el id de usuario es =${id}, y el id generado es=${item}`);
                    //*console.log(item);
                    return currentUniqueID;
                }
            });
            console.log(storageContent);
        }
    };
    //^^CHECK ID DISPONIBILITY--OVER
    //^^ ************************************************************************ *//

    //^^SELECT SECTION BTNS--START
    //~~SELECT SECTION CREATE--START
    const activateCreateSection = () => {
        btnSelectCreate.classList.add('select_section_btn_active');
        btnSelectLogin.classList.remove('select_section_btn_active');
        //*console.log(btnSelectCreate.classList, btnSelectLogin.classList);
        labelInputName.textContent = 'Nombre de usuario';
        emailInputContainer.style.display = 'flex';
        emailInputContainer.style.flexDirection = 'column';
        emailInputContainer.style.justifyContent = 'flex-start';
        //*emailInputContainer.style.alignContent = 'center';
        setTimeout(() => {
            animateItemOpacityTranslate(labelInputEmail, '1', 'translateY(0)');
            animateItemOpacityTranslate(userEmailInput, '1', 'translateY(0)');
        }, 200);
        activeLoginSection = 'create';
    };
    activateCreateSection();
    //~~SELECT SECTION CREATE--OVER
    //~~ ********************************************************************************************* *//
    //~~SELECT SECTION LOGIN--START
    const activateLoginSection = () => {
        btnSelectLogin.classList.add('select_section_btn_active');
        btnSelectCreate.classList.remove('select_section_btn_active');
        labelInputName.textContent = 'Nombre de usuario o  contraseña';
        animateItemOpacityTranslate(labelInputEmail, '0', 'translateY(50%)');
        animateItemOpacityTranslate(userEmailInput, '0', 'translateY(50%)');
        setTimeout(() => {
            emailInputContainer.style.display = 'none';
        }, 700);
        activeLoginSection = 'login';
    };
    //~~SELECT SECTION LOGIN--OVER
    //~~ ********************************************************************************************* *//
    //^^SELECT SECTION BTNS--OVER
    //^^ ********************************************************************************************* *//
    //^^ CHECK DATA NAME--START
    let searchNameResponse = '';
    let searchEmailResponse = '';
    let searchPasswordResponse = '';
    let localStorageDataNames = [];
    let localStorageDataEmails = [];
    let localStorageDataPasswords = [];
    let localStorageDataNameInput = [];
    let loginNameResponse;
    const blank = 'Blank';
    const good = 'Good';
    const short = 'To short';
    const exist = 'Exist';
    const notExist = 'Not Exist';
    const accepted = 'Accepted';
    const rejected = 'Rejected';

    let loginEmailResponse;
    let loginPasswordResponse;
    let createNameResponse;
    let createEmailResponse;
    let createPasswordResponse;
    const checkDataNames = (userName) => {
        let getLocalStorageData = JSON.parse(localStorage.getItem(localStorageName));
        storageForJohnKPage = getLocalStorageData;

        const userData = storageForJohnKPage['user_data'];
        userData.forEach((userDataName) => {
            if (!localStorageDataNames.includes(userDataName['user_name'])) {
                localStorageDataNames.push(userDataName['user_name']);
            }
        });
        //*console.log(localStorageDataNames);

        if (!userName) {
            searchNameResponse = blank;
            alertMsgName.textContent = invalidBlank;
            userNameInput.style.outline = redBorder;
            alertSvgName.innerHTML = errorIcon;
            //*console.log(searchNameResponse);
        } else if (userName.length < 6) {
            alertMsgName.textContent = invalidUserShort;
            userNameInput.style.outline = redBorder;
            alertSvgName.innerHTML = errorIcon;
            searchNameResponse = short;
        } else if (userName.length >= 6) {
            searchNameResponse = good;
        }
        if ((searchNameResponse === good) & localStorageDataNames.includes(userName)) {
            searchNameResponse = exist;
            //*console.log(searchNameResponse);
        } else if ((searchNameResponse === good) & !localStorageDataNames.includes(userName)) {
            searchNameResponse = notExist;
            //*console.log(searchNameResponse);
        }
        if (activeLoginSection === 'create') {
            if (searchNameResponse === exist) {
                alertMsgName.textContent = invalidUserExist;
                userNameInput.style.outline = redBorder;
                alertSvgName.innerHTML = errorIcon;
                searchNameResponse = rejected;
            } else if (searchNameResponse === notExist) {
                alertMsgName.textContent = 'Este nombre de usuario es valido';
                userNameInput.style.outline = greenBorder;
                alertSvgName.innerHTML = okIcon;
                searchNameResponse = accepted;
            }
        } else if (activeLoginSection === 'login') {
            console.log('estas en la zona de login');

            if (searchNameResponse === notExist) {
                alertMsgName.textContent = invalidLoginAll;
                userNameInput.style.outline = redBorder;
                alertSvgName.innerHTML = errorIcon;
                searchNameResponse = rejected;
            } else if (searchNameResponse === exist) {
                alertMsgName.textContent = 'El nombre de usuario es valido';
                userNameInput.style.outline = greenBorder;
                alertSvgName.innerHTML = okIcon;
                searchNameResponse = accepted;
            }
        }
    };
    //^^ CHECK DATA NAME--OVER
    //^^ *************************************************************************************************** *//
    //^^ CHECK DATA EMAIL AND NAME--START
    const checkDataNameInput = (userName, userPassword) => {
        let getLocalStorageData = JSON.parse(localStorage.getItem(localStorageName));
        storageForJohnKPage = getLocalStorageData;

        localStorageDataNameInput = [];
        //*console.log(getLocalStorageData['user_data']);
        const userData = storageForJohnKPage['user_data'];
        userData.forEach((user) => {
            if (!localStorageDataNameInput.includes(user['user_email'])) {
                localStorageDataNameInput.push(user['user_email']);
            }
            if (!localStorageDataNameInput.includes(user['user_name'])) {
                localStorageDataNameInput.push(user['user_name']);
            }
        });
        //*console.log(localStorageDataNameInput);

        if (!userName) {
            searchNameResponse = blank;
            alertMsgName.textContent = invalidBlank;
            userNameInput.style.outline = redBorder;
            alertSvgName.innerHTML = errorIcon;
            //*console.log(searchNameResponse);
        } else if (!localStorageDataNameInput.includes(userName)) {
            searchNameResponse = notExist;
            alertMsgName.textContent = invalidLoginAll;
            userNameInput.style.outline = redBorder;
            alertSvgName.innerHTML = errorIcon;
        } else if (localStorageDataNameInput.includes(userName)) {
            searchNameResponse = exist;
        }
    };
    //^^ CHECK DATA EMAIL AND NAME--OVER
    //^^ *************************************************************************************************** *//
    //^^ CHECK DATA EMAIL--START
    const checkDataEmails = (userEmail) => {
        let getLocalStorageData = JSON.parse(localStorage.getItem(localStorageName));
        storageForJohnKPage = getLocalStorageData;

        localStorageDataEmails = [];
        //*console.log(getLocalStorageData['user_data']);
        const userData = storageForJohnKPage['user_data'];
        userData.forEach((userDataEmail) => {
            localStorageDataEmails.push(userDataEmail['user_email']);
        });
        //*console.log(localStorageDataEmails);

        if (!userEmail) {
            searchEmailResponse = blank;
            alertMsgEmail.textContent = invalidBlank;
            userEmailInput.style.outline = redBorder;
            alertSvgEmail.innerHTML = errorIcon;
            //*console.log(searchEmailResponse);
        } else if (!localStorageDataEmails.includes(userEmail)) {
            searchEmailResponse = notExist;
            //*console.log(searchEmailResponse);
        } else if (localStorageDataEmails.includes(userEmail)) {
            searchEmailResponse = exist;
            console.log(searchEmailResponse);
        }

        if (activeLoginSection === 'create') {
            //*console.log('estas en la zona de create');
            if (searchEmailResponse === exist) {
                alertMsgEmail.textContent = invalidEmailExist;
                userEmailInput.style.outline = redBorder;
                alertSvgEmail.innerHTML = errorIcon;
                searchEmailResponse = rejected;
            } else if (searchEmailResponse === notExist) {
                alertMsgEmail.textContent = 'Email de usuario valido';
                userEmailInput.style.outline = greenBorder;
                alertSvgEmail.innerHTML = okIcon;
                searchEmailResponse = accepted;
            }
        } else if (activeLoginSection === 'login') {
            //*console.log('estas en la zona de login, nada de email deberia pasar aqui');
        }
    };
    //^^ CHECK DATA EMAIL--OVER
    //^^ *************************************************************************************************** *//
    //^^ CHECK DATA PASSWORD--START
    const changeShowPasswordIcon = (icon) => {
        showPasswordBtn.innerHTML = icon;
        if (passwordStatus === close) {
            setTimeout(() => {
                showPasswordBtn.innerHTML = closeEyed;
            }, 2000);
        } else if (passwordStatus == open) {
            setTimeout(() => {
                showPasswordBtn.innerHTML = openEyed;
            }, 2000);
        }
    };
    const checkDataPasswords = (userPassword, userName) => {
        let getLocalStorageData = JSON.parse(localStorage.getItem(localStorageName));
        storageForJohnKPage = getLocalStorageData;

        const userData = storageForJohnKPage['user_data'];
        userData.forEach((user) => {
            if (!localStorageDataPasswords.includes(user['user_password'])) {
                localStorageDataPasswords.push(user['user_password']);
            }
        });
        //*console.log(localStorageDataPasswords);
        if (!userPassword) {
            userPasswordInput.style.outline = redBorder;
            alertMsgPassword.textContent = 'Este campo necesita llenarse';
            searchPasswordResponse = blank;
            changeShowPasswordIcon(errorIcon);

            //*alertSvgPassword.innerHTML = errorIcon;
            //*console.log(`The password response is ${searchPasswordResponse}`);
        } else if (userPassword.length < 6) {
            userPasswordInput.style.outline = redBorder;
            alertMsgPassword.textContent = invalidPasswordShort;

            changeShowPasswordIcon(errorIcon);
            searchPasswordResponse = short;
            //*console.log(`The password response is ${searchPasswordResponse}`);
        } else if (userPassword.length >= 6) {
            searchPasswordResponse = good;
            userPasswordInput.style.outline = greenBorder;
            alertMsgPassword.textContent = 'El password es valido';
            //*console.log(`The password response is ${searchPasswordResponse}`);
        }
    };
    //^^ CHECK DATA PASSWORD--OVER
    //^^ *************************************************************************************************** *//

    const finalCheckCreate = (nameValue, emailValue, passwordValue) => {
        let newName = nameValue;
        let newEmail = emailValue;
        let newPassword = passwordValue;
        checkDataNames(newName);
        checkDataEmails(newEmail);
        checkDataPasswords(newPassword);
        console.log(searchNameResponse, searchEmailResponse, searchPasswordResponse);
        if (searchEmailResponse === accepted && searchNameResponse === accepted && searchPasswordResponse === good) {
            alertMsgEmail.textContent = 'Email de usuario valido';
            userEmailInput.style.outline = greenBorder;
            alertSvgEmail.innerHTML = okIcon;

            alertMsgName.textContent = 'Nombre de usuario valido';
            userNameInput.style.outline = greenBorder;
            alertSvgName.innerHTML = okIcon;

            alertMsgPassword.textContent = 'Contraseña agregada correctamente';
            userPasswordInput.style.outline = greenBorder;
            //*alertSvgPassword.innerHTML = okIcon;

            currentUniqueID = createNewUniqueArray();
            checkId(currentUniqueID);
            console.log(currentUniqueID);
            let getLocalStorageData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getLocalStorageData;
            console.log(storageForJohnKPage);
            let newUser = new UserData(currentUniqueID, newName, newEmail, newPassword);
            storageForJohnKPage['db_data']['user_count'] += 1;
            storageForJohnKPage['user_data'].push(newUser);
            console.log(storageForJohnKPage);
            localStorage.setItem(localStorageName, JSON.stringify(storageForJohnKPage));
            const newData = JSON.parse(localStorage.getItem(localStorageName));
            console.log(newData);
            console.log('todos los datos son validos se creo un nuevo usuario');
        } else {
            console.log('Los datos aun no son completamente validos');
        }
    };
    const finalCheckLogin = (nameValue, passwordValue) => {
        checkDataNameInput(nameValue);
        checkDataPasswords(passwordValue);

        if (searchPasswordResponse === good) {
            let getLocalStorageData = JSON.parse(localStorage.getItem(localStorageName));
            storageForJohnKPage = getLocalStorageData;
            const userData = storageForJohnKPage['user_data'];
            userData.forEach((user) => {
                //*console.log(user);
                let currentName = user['user_name'];
                let currentEmail = user['user_email'];
                if (currentName.includes(nameValue) || currentEmail.includes(nameValue)) {
                    let currentUserPassword = user['user_password'];
                    if (currentUserPassword !== passwordValue) {
                        alertMsgPassword.textContent = invalidLoginAll;
                        userPasswordInput.style.outline = redBorder;
                        changeShowPasswordIcon(errorIcon);
                        searchPasswordResponse = rejected;
                        //*console.log('No es aceptado por que la contraseña no es igual');
                    } else if (currentUserPassword === passwordValue) {
                        searchPasswordResponse = accepted;
                        //*console.log('La contraseña coincide');
                    }
                }
            });
        }

        if (searchNameResponse === exist && searchPasswordResponse === accepted) {
            userNameInput.style.outline = greenBorder;
            alertMsgName.textContent = 'La nombre de usuario es correcto';
            alertSvgName.innerHTML = okIcon;

            alertMsgPassword.textContent = 'El password es correcto';
            userPasswordInput.style.outline = greenBorder;

            //*console.log('Now you are really in');
        } else if (searchNameResponse === exist && searchPasswordResponse !== accepted) {
            alertMsgName.textContent = invalidLoginAll;
            userNameInput.style.outline = redBorder;
            alertSvgName.innerHTML = errorIcon;
            changeShowPasswordIcon(errorIcon);

            alertMsgPassword.textContent = invalidLoginAll;
            userPasswordInput.style.outline = redBorder;
        }
    };
    //^^CHECK DATA--START //--FINAL CHECK SEND BTN CHECK
    const checkData = () => {
        checkForLocalStorageData();

        let inputNameValue = userNameInput.value.trim();
        let inputEmailValue = userEmailInput.value.toLowerCase().trim();
        let inputPasswordValue = userPasswordInput.value.trim();
        if (activeLoginSection === 'create') {
            finalCheckCreate(inputNameValue, inputEmailValue, inputPasswordValue);
        } else if (activeLoginSection === 'login') {
            //*finalCheckLogin(inputNameValue,inputEmailValue,inputPasswordValue);
            finalCheckLogin(inputNameValue, inputPasswordValue);
        }
    };
    //^^CHECK DATA--OVER
    //^^ *************************************************************************************************** *//
    //!FUNCTIONS--OVER
    //! ************************************************************************ *//
    //! ADD EVENT LISTENERS--START
    acceptModalBtn.addEventListener('click', acceptingStorage);
    btnSelectCreate.addEventListener('click', activateCreateSection);
    btnSelectLogin.addEventListener('click', activateLoginSection);
    submitBtn.addEventListener('click', checkData);
    showPasswordBtn.addEventListener('click', btnShowPasswordActions);
    //!TRASH BTN--START

    const trashLocalStorageBtn = document.querySelector('#trash_localStorage_btn');
    trashLocalStorageBtn.addEventListener('click', () => {
        localStorage.removeItem(localStorageName);
    });
    changeThemeBtn.addEventListener('click', changeTheme);
    //!TRASH BTN--OVER
    //! ************************************************************************** *//
});
