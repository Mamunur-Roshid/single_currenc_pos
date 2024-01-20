import Vue from 'vue';
import Vuex from 'vuex';
import authorized from './authorized';
import area from './area';
import brand from './brand';
import branch from './branch';
import bankAccount from './bank-account';
import bankTransaction from './bank-transaction';
import category from './category';
import cheque from './cheque';
import customer from './customer';
import companyProfile from './company-profile';
import cashTransaction from './cash-transction';
import damage from './damage';
import dashboard from './dashboard';
import department from './department';
import designation from './designation';
import employee from './employee';
import expense from './expense';
import layout from './layout';
import month from './month';
import product from './product';
import purchase from './purchase';
import unit from './unit';
import snackbar from './snackbar';
import sale from './sale';
import supplier from './supplier';
import salaryPayment from './salary-payment';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => {
        return {
            host: process.env.NODE_ENV === 'production' ? 'https://pos.skmachineriesbd.com/api' : 'http://127.0.0.1:8000/api',
            hostName: process.env.NODE_ENV === 'production' ? 'https://pos.skmachineriesbd.com/' : 'http://127.0.0.1:8000',

            countries: [
                'Abkhazia',
                'Afghanistan',
                'Akrotiri and Dhekelia (United Kingdom)',
                'Åland Islands (Finland)',
                'Albania',
                'Algeria',
                'American Samoa (United States)',
                'Andorra',
                'Angola',
                'Anguilla (United Kingdom)',
                'Antarctica',
                'Antigua and Barbuda',
                'Argentina',
                'Armenia',
                'Artsakh',
                'Aruba (Netherlands)',
                'Ashmore and Cartier Islands (Australia)',
                'Australia',
                'Austria',
                'Azerbaijan',
                'The Bahamas',
                'Bahrain',
                'Bangladesh',
                'Barbados',
                'Belarus',
                'Belgium',
                'Belize',
                'Benin',
                'Bermuda (United Kingdom)',
                'Bhutan',
                'Bir Tawil (terra nullius)',
                'Bolivia',
                'Bonaire (Netherlands)',
                'Bosnia and Herzegovina',
                'Botswana',
                'Bouvet Island (Norway)',
                'Brazil',
                'British Indian Ocean Territory (United Kingdom)',
                'British Virgin Islands (United Kingdom)',
                'Brunei',
                'Bulgaria',
                'Burkina Faso',
                'Burundi',
                'Cambodia',
                'Cameroon',
                'Canada[Note 3]',
                'Cape Verde',
                'Cayman Islands (United Kingdom)',
                'Central African Republic',
                'Chad',
                'Chile',
                'China',
                'Christmas Island (Australia)',
                'Clipperton Island (France)',
                'Cocos (Keeling) Islands (Australia)',
                'Colombia',
                'Comoros',
                'Democratic Republic of the Congo',
                'Republic of the Congo',
                'Cook Islands (New Zealand)',
                'Coral Sea Islands (Australia)',
                'Costa Rica',
                'Croatia',
                'Cuba',
                'Curaçao (Netherlands)',
                'Cyprus',
                'Czech Republic',
                'Denmark',
                'Denmark Kingdom of Denmark',
                'Djibouti',
                'Dominica',
                'Dominican Republic',
                'Earth symbol.svg World',
                'East Timor',
                'Ecuador',
                'Egypt',
                'El Salvador',
                'Equatorial Guinea',
                'Eritrea',
                'Estonia',
                'Eswatini',
                'Ethiopia',
                'Falkland Islands (United Kingdom)',
                'Faroe Islands (Denmark)',
                'Fiji',
                'Finland',
                'France',
                'France (metropolitan)',
                'French Polynesia (France)',
                'French Southern Territories (France)',
                'Gabon',
                'The Gambia',
                'Georgia',
                'Germany',
                'Ghana',
                'Gibraltar (United Kingdom)',
                'Greece',
                'Greenland (Denmark)',
                'Grenada',
                'Guam (United States)',
                'Guatemala',
                'Guernsey (British Crown dependency)',
                'Guinea',
                'Guinea-Bissau',
                'Guyana',
                'Haiti',
                'Heard Island and McDonald Islands (Australia)',
                'Honduras',
                'Hong Kong (China)',
                'Hungary',
                'Iceland',
                'India',
                'Indonesia',
                'Iran',
                'Iraq',
                'Ireland',
                'Isle of Man (British Crown dependency)',
                'Israel',
                'Italy',
                'Ivory Coast',
                'Jamaica',
                'Jan Mayen (Norway)',
                'Japan',
                'Jersey (British Crown dependency)',
                'Jordan',
                'Kazakhstan',
                'Kenya',
                'Kiribati',
                'North Korea',
                'South Korea',
                'Kosovo',
                'Kuwait',
                'Kyrgyzstan',
                'Laos',
                'Latvia',
                'Lebanon',
                'Lesotho',
                'Liberia',
                'Libya',
                'Liechtenstein',
                'Lithuania',
                'Luxembourg',
                'Macau (China)',
                'Madagascar',
                'Malawi',
                'Malaysia',
                'Maldives',
                'Mali',
                'Malta',
                'Marshall Islands',
                'Mauritania',
                'Mauritius',
                'Mexico',
                'Federated States of Micronesia',
                'Moldova',
                'Monaco',
                'Mongolia',
                'Montenegro',
                'Montserrat (United Kingdom)',
                'Morocco',
                'Mozambique',
                'Myanmar',
                'Namibia',
                'Nauru',
                'Nepal',
                'Netherlands',
                'New Caledonia (France)',
                'New Zealand',
                'Nicaragua',
                'Niger',
                'Nigeria',
                'Niue (New Zealand)',
                'Norfolk Island (Australia)',
                'North Macedonia',
                'Northern Cyprus',
                'Northern Mariana Islands (United States)',
                'Norway',
                'Norway (mainland)',
                'Oman',
                'Pakistan',
                'Palau',
                'State of Palestine',
                'Panama',
                'Papua New Guinea',
                'Paraguay',
                'Peru',
                'Philippines',
                'Pitcairn Islands (United Kingdom)',
                'Poland',
                'Portugal',
                'Puerto Rico (United States)',
                'Qatar',
                'Romania',
                'Russia',
                'Rwanda',
                'Saba (Netherlands)',
                'Sahrawi Arab Democratic Republic',
                'Saint Barthélemy (France)',
                'Saint Helena, Ascension and Tristan da Cunha (United Kingdom)',
                'Saint Kitts and Nevis',
                'Saint Lucia',
                'Saint Martin (France)',
                'Saint Pierre and Miquelon (France)',
                'Saint Vincent and the Grenadines',
                'Samoa',
                'San Marino',
                'São Tomé and Príncipe',
                'Saudi Arabia',
                'Senegal',
                'Serbia',
                'Seychelles',
                'Sierra Leone',
                'Singapore',
                'Sint Eustatius (Netherlands)',
                'Sint Maarten (Netherlands)',
                'Slovakia',
                'Slovenia',
                'Solomon Islands',
                'Somalia',
                'Somaliland',
                'South Africa',
                'South Georgia and the South Sandwich Islands (United Kingdom)',
                'South Ossetia',
                'South Sudan',
                'Spain',
                'Spratly Islands (disputed)',
                'Sri Lanka',
                'Sudan',
                'Suriname',
                'Svalbard (Norway)',
                'Sweden',
                'Switzerland',
                'Syria',
                'Taiwan',
                'Tajikistan',
                'Tanzania',
                'Thailand',
                'Togo',
                'Tokelau (New Zealand)',
                'Tonga',
                'Transnistria',
                'Trinidad and Tobago',
                'Tunisia',
                'Turkey',
                'Turkmenistan',
                'Turks and Caicos Islands (United Kingdom)',
                'Tuvalu',
                'Uganda',
                'Ukraine',
                'United Arab Emirates',
                'United Kingdom',
                'United States',
                'United States Minor Outlying Islands',
                'U.S. Virgin Islands (United States)',
                'Uruguay',
                'Uzbekistan',
                'Vanuatu',
                'Vatican City',
                'Venezuela',
                'Vietnam',
                'Wallis and Futuna (France)',
                'Yemen',
                'Zambia',
                'Zimbabwe',
            ],
        }
    },

    getters: {
        countries(state) {
            return state.countries;
        }

    },

    mutations: {

    },

    actions: {

    },

    modules: {
        authorized,
        area, 
        brand, 
        branch,
        bankAccount,
        bankTransaction,
        category, 
        cheque,
        customer,
        companyProfile, 
        cashTransaction,
        damage,
        dashboard,
        department,
        designation,
        employee,
        expense,
        layout,
        month,
        product,
        purchase,
        unit, 
        user, 
        sale,
        supplier, 
        salaryPayment,
        snackbar, 
    }
})