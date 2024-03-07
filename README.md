# Тестовое задание (TestTaskValantis)

## Задание
Используя предоставленный API создать страницу, которая отображает список товаров.
Для каждого товара должен отображаться его id, название, цена и бренд.

### Требования
* выводить по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны
* возможность фильтровать выдачу исползуя предоставленное API по названию, цене и бренду

Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются. Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.

## Выполнение

### Деплой
[dmycse.github.io/ValantisJW/](dmycse.github.io/ValantisJW/)

### Стек
Задание выполнено с использованием следующего стека:
* JS ES6+ Modules
* [CryptoJS](https://www.npmjs.com/package/crypto-js) 
* [Vite](https://vitejs.dev/) 

### Компоненты
*src/components/App*
* App.js - корневой компонент

*src/components/Catalog*
* Catalog.js - компонент отрисовки каталога товаров

*src/components/MovePage*
* MovePage.js - компонент постраничного перехода по каталогу товаров в обе стороны

*src/components/Filter*
* Filter.js - компонент фильтрации товаров по названию, цене и бренду

*src/components/ErrorPage*
* ErrorPage.js - компонент сообщения об ошибке, при невозможности получить/загрузить данные с API

*src/components/NoDataPage*
* NoDataPage.js - компонент сообщения об ошибке, при невозможности найти данные в соответствии с запросом пользователя

*src/redux/Spinner*
* Spinner.js - компонент отображения спиннера во время поиска/загрузки данных

### Утилиты
*src/utils*
* authString.js - утилита формированания авторизационной строки
* cache.js - локальный стор для хранения загруженных из API товаров, и предзагрузки товаров из API. Предназначен для удобства пользователя (уменьшения времени ожидания загрузки товаров) и сокращения обращений к API
* dublicatesUtil.js - утилита поиска дублей в данных полученных из API
* getApiData.js - утилита обращения к API

### Константы
*src/constants*
* api.js - url-адреса для обращения к API
* brands.js - список брендов, используемых в каталоге товаров
* catalogNumPages.js - номера начальной и последней страницы каталога товаров
* htmlNodeElements.js - ссылки на разделы приложения

