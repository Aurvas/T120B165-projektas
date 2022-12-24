# T120B165-projektas BookHotel

## Turinys
- [Sprendžiamo uždavinio aprašymas](#sprendžiamo-uždavinio-aprašymas)
- [Pasirinktų technologijų aprašymas](#pasirinktų-technologijų-aprašymas)
- [Sistemos architektūra](#sistemos-architektūra)  
- [Naudotojo sąsajos projektas](#naudotojo-sąsajos-projektas)
- [API specifikacija](#api-specifikacija)
- [Išvados](#išvados)

## Sprendžiamo uždavinio aprašymas
### Sistemos paskirtis
Kuriamos sistemos paskirtis - bendra viešbučių platforma, leidžianti klientams lengviau susirasti ir rezervuotis tinkamą viešbučio numerį.

Svetainėje patvirtintos įmonės gali skelbti savo turimų viešbučių siūlomas paslaugas. Prisiregistravęs naudotojas gali užsirezervuoti pasirinkto viešbučio numerį nurodytu laiku, o rezervaciją patvirtina šio viešbučio įmonė.
### Funkciniai reikalavimai
Svečias sistemoje gali:
1. Užsiregistruoti prie platformos;
2. Prisijungti prie platformos;
3. Peržiūrėti miestų sąrašą;
4. Peržiūrėti viešbučių sąrašą;
5. Peržiūrėti viešbučių numerius;

Registruotas naudotojas gali:
1. Pridėti viešbutį;
2. Pridėti viešbučio numerius;
3. Redaguoti, pašalinti savo viešbučio informaciją;
4. Redaguoti, pašalinti savo viešbučio numerio informaciją;

Administratorius sistemoje gali:
1. Pridėti, pašalinti miestą;
3. Redaguoti, pašalinti net kurio viešbučio informaciją;
4. Redaguoti, pašalinti bet kurio viešbučio numerio informaciją;

## Pasirinktų technologijų aprašymas
Pasirinktos technologijos:
- Klientas (angl. front-end) - React js;
- Serveris (angl. back-end) - ASP.NET Core su MySQL duomenų baze;
- Sistema talpinama Microsoft Azure debesyje.
## Sistemos architektūra
![Sistemos architektūra](Architektura.png)
## Naudotojo sąsajos projektas

## API specifikacija
**Miestai**  
**GET /api/cities**  
Grąžina visus miestus  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |  

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 200  | Grąžina sąrašą  | 

Užklausos pavyzdys  
GET [domenas]/api/cities  
Užklausos atsakymas  
```
[
    {
        "id": 1,
        "cityName": "Telšiai",
        "county": "Telsiu r.",
        "imageUrl": " "
    },
    {
        "id": 2,
        "cityName": "Kaunas",
        "county": "Kauno m.",
        "imageUrl": "https://luxexpress.fra1.cdn.digitaloceanspaces.com/files/k%C4%85%20veikti%20kaune(1).jpg"
    }
}
```  
**GET /api/cities/id**  
Grąžina miestą  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |  

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 200  | Grąžina elementą  | 
| 404  | Nerasta  | 

Užklausos pavyzdys  
GET [domenas]/api/cities/1  
Užklausos atsakymas  
```
{
    "resource": {
        "id": 1,
        "cityName": "Telšiai",
        "county": "Telsiu r.",
        "imageUrl": " "
    }
}
```  
Jei nerasta  
```  
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-8121d6c4369f145ed5d6cc461cca7d78-b712a445aef222f7-00"
}
```  
**POST /api/cities**  
Sukuria naują miestą  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |  
| Authorization | JWT access token |

Parametrai  
| Parametras  | Reikšmė | Būtina |
| ------------- | ------------- | ------------- |
| CityName  | Miesto pavadinimas  | Taip |  
| County | Rajono pavadinimas | Taip |
| ImageUrl | Nuotraukos URL adresas | Ne |

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 201  | Sukuria elementą | 
| 401 | Nėra leidimo |
| 404 | Nerasta |

Užklausos pavyzdys  
POST [domenas]/api/cities  
Parametrai  
```
{
    "CityName": "Mažeikiai",
    "County": "Mažeikių r."
}
```
Užklausos atsakymas  
```
{
    "id": 9,
    "cityName": "Mažeikiai",
    "county": "Mažeikių r.",
    "imageUrl": " "
}
```  

**DELETE /api/cities/id**  
Panaikina miestą  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 204  | Elementas pašalintas | 
| 401 | Nėra leidimo | 
| 404  | Nerasta | 

Užklausos pavyzdys  
DELETE [domenas]/api/cities/9   
Atsakymas: 204 - pašalinta arba 404 - nėra leidimo  
Jei nerasta
```
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-1af93bbc4ffa3c6605bacefcb7a57688-dd0eaa470787b7f0-00"
}
```

**PUT /api/cities/id**  
Redaguoja miestą  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |  
| Authorization | JWT access token |

Parametrai  
| Parametras  | Reikšmė | Būtina |
| ------------- | ------------- | ------------- |
| CityName  | Miesto pavadinimas  | Taip |  
| County | Rajono pavadinimas | Taip |
| ImageUrl | Nuotraukos URL adresas | Ne |

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 200  | Atnaujina elementą | 
| 401 | Nėra leidimo |
| 404 | Nerasta |

Užklausos pavyzdys  
PUT [domenas]/api/cities/3  
Parametrai  
```
{
    "County": "Vilniaus m."
}
```
Užklausos atsakymas  
```
{
    "id": 3,
    "cityName": "Vilnius",
    "county": "Vilniaus m.",
    "imageUrl": " "
}
```  
**Viešbučiai**  
**GET /api/cities/id/hotels**  
Grąžina visus miesto viešbučius  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |  

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 200  | Grąžina sąrašą  | 

Užklausos pavyzdys  
GET [domenas]/api/cities/1/hotels  
Užklausos atsakymas  
```
[
    {
        "id": 1,
        "name": "Oyope",
        "address": "097 Prairieview Point",
        "email": " ",
        "starCount": 4,
        "cityId": 1
    },
    {
        "id": 2,
        "name": "Quinu",
        "address": "03916 High Crossing Road",
        "email": "ccraufordc@squidoo.com",
        "starCount": 3,
        "cityId": 1
    }
]
```
Jei nėra
```
[]
```
**GET /api/cities/id/hotels/id**  
Grąžina miesto viešbutį  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |  

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 200  | Grąžina elementą  | 
| 404  | Nerasta  | 

Užklausos pavyzdys  
GET [domenas]/api/cities/1/hotels/1  
Užklausos atsakymas  
```
{
    "resource": {
        "id": 1,
        "name": "Oyope",
        "address": "097 Prairieview Point",
        "email": " ",
        "starCount": 4,
        "cityId": 1
    }
}
```  
Jei nerasta  
```  
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
    "title": "Not Found",
    "status": 404,
    "traceId": "00-8121d6c4369f145ed5d6cc461cca7d78-b712a445aef222f7-00"
}
```  
**POST /api/cities/id/hotels**  
Sukuria naują miesto viešbutį  
Reikalaujamos siuntimo antraštės
| Antraštė  | Reikšmė |
| ------------- | ------------- |
| Content-Type  | application/json  |  
| Authorization | JWT access token |

Parametrai  
| Parametras  | Reikšmė | Būtina |
| ------------- | ------------- | ------------- |
| Name  | Viešbučio pavadinimas  | Taip |  
| Address | Viešbučio adresas | Taip |
| Email | Elektroninis paštas | Ne |
| StarCount | Žvaigždučių skaičius | Taip |

Atsako kodai  
| Atsako kodas  | Reikšmė |
| ------------- | ------------- |
| 201  | Sukuria elementą | 
| 401 | Nėra leidimo |
| 404 | Nerasta |

Užklausos pavyzdys  
POST [domenas]/api/cities/1/hotels  
Parametrai  
```
{
    "Name": "Aivee",
    "Address": "71204 Menomonie Parkway",
    "StarCount": 5
}
```
Užklausos atsakymas  
```
{
    "id": 8,
    "name": "Aivee",
    "address": "71204 Menomonie Parkway",
    "email": " ",
    "starCount": 5,
    "cityId": 1
}
```
Jei nėra miesto
```
Couldn't find a city with id of 100
```
## Išvados

