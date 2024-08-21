# GameShop
Pahoittelen, tässä ovat linkit oikein muotoiltuina:

1. **Sovelluksen salasanan luominen**: [Google Support - Sovelluksen salasanat](https://support.google.com/accounts/answer/185833)
2. **Vähemmän turvallisten sovellusten käyttö**: [Google Account - Less Secure Apps](https://myaccount.google.com/lesssecureapps)



Jos saat viestin "the setting you are looking for is not available for your account" yrittäessäsi sallia vähemmän turvallisten sovellusten käytön, syynä on todennäköisesti seuraavat:

1. **Vähemmän turvallisten sovellusten käytön poistaminen**: Google on hiljattain kiristänyt tietoturvakäytäntöjään, eikä vähemmän turvallisten sovellusten käyttöä enää tueta kaikilla tileillä. Tämä asetus on poistettu käytöstä useimmille käyttäjille.

2. **Kaksivaiheinen tunnistautuminen**: Jos olet ottanut käyttöön kaksivaiheisen tunnistautumisen, sinun täytyy käyttää sovelluksen salasanaa tavallisen salasanan sijaan, koska vähemmän turvallisten sovellusten asetus ei ole käytettävissä.

### Ratkaisut

1. **Käytä Sovelluksen Salasanaa**:
   - Jos tililläsi on kaksivaiheinen tunnistautuminen, luo ja käytä sovelluksen salasanaa tavallisen salasanasi sijaan.
   - Luo sovelluksen salasana seuraavasti:
     - Siirry Google-tilisi [Sovelluksen salasanat](https://support.google.com/accounts/answer/185833) -sivulle.
     - Valitse "Mail" sovellukseksi ja "Windows Computer" laitteeksi.
     - Käytä saatua salasanaa `nodemailer`-konfiguraatiossasi.

2. **OAuth2 Autentikointi**:
   - Voit käyttää OAuth2-autentikointia, joka on turvallisempi ja modernimpi tapa autentikoida Google-tilin kautta. Tämä vaatii kuitenkin hieman enemmän asennustyötä, mutta tarjoaa hyvän turvallisuuden.

Jos sovelluksen salasanan käyttö ei ole mahdollista tai haluat lisätietoa OAuth2:n käyttämisestä, voin auttaa siinäkin.