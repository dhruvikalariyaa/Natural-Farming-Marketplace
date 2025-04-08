import appointment_img from './appointment_img.png';
import header_img from './header_img.png';
import group_profiles from './group_profiles.png';
import profile_pic from './profile_pic.png';
import contact_image from './contact_image.png';
import about_image from './about_image.png';
import logo from './logo.png';
import dropdown_icon from './dropdown_icon.svg';
import menu_icon from './menu_icon.svg';
import cross_icon from './cross_icon.png';
import chats_icon from './chats_icon.svg';
import verified_icon from './verified_icon.svg';
import arrow_icon from './arrow_icon.svg';
import info_icon from './info_icon.svg';
import upload_icon from './upload_icon.png';
import stripe_logo from './stripe_logo.png';
import razorpay_logo from './razorpay_logo.png';
import vagetables from './vagetables.png';
import fruits from './fruits.png';
import spices from './spices.png';
import honey from './honey.png';
import dairy from './dairy.png';
import nuts from './nuts.png';
import grains from './grains.png';
import oil from './oil.png';
import tomato from './tomato.png';
import onion from './onion.png';
import potato from './potato.png';
import apple from './apple.png';
import banana from './banana.png';
import orange from './orange.png';
import basil from './basil.png';
import mint from './mint.png';
import cinnamon from './cinnamon.png';
import raw_honey from './raw_honey.png';
import organic_honey from './organic_honey.png';
import milk from './milk.png';
import cheese from './cheese.png';
import butter from './butter.png';
import almonds from './almonds.png';
import cashews from './cashews.png';
import walnuts from './walnuts.png';
import rice from './rice.png';
import wheat from './wheat.png';
import oats from './oats.png';
import olive_oil from './olive_oil.png';
import coconut_oil from './coconut_oil.png';
import upload_area from './upload_area.png';

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    upload_area
};

export const specialityData = [
    {
        speciality: 'Vagetables',
        image: vagetables,
        subcategories: [
            { name: 'Tomato', image: tomato },
            { name: 'Onion', image: onion },
            { name: 'Potato', image: potato }
        ]
    },
    {
        speciality: 'Fruits',
        image: fruits,
        subcategories: [
            { name: 'Apple', image: apple },
            { name: 'Banana', image: banana },
            { name: 'Orange', image: orange }
        ]
    },
    {
        speciality: 'Herbs & Spices',
        image: spices,
        subcategories: [
            { name: 'Basil', image: basil },
            { name: 'Mint', image: mint },
            { name: 'Cinnamon', image: cinnamon }
        ]
    },
    {
        speciality: 'Honey',
        image: honey,
        subcategories: [
            { name: 'Raw Honey', image: raw_honey },
            { name: 'Organic Honey', image: organic_honey }
        ]
    },
    {
        speciality: 'Dairy Products',
        image: dairy,
        subcategories: [
            { name: 'Milk', image: milk },
            { name: 'Cheese', image: cheese },
            { name: 'Butter', image: butter }
        ]
    },
    {
        speciality: 'Dry Fruits & Nuts',
        image: nuts,
        subcategories: [
            { name: 'Almonds', image: almonds },
            { name: 'Cashews', image: cashews },
            { name: 'Walnuts', image: walnuts }
        ]
    },
    {
        speciality: 'Grains & Cereals',
        image: grains,
        subcategories: [
            { name: 'Rice', image: rice },
            { name: 'Wheat', image: wheat },
            { name: 'Oats', image: oats }
        ]
    },
    {
        speciality: 'Edible Oils & Fats',
        image: oil,
        subcategories: [
            { name: 'Olive Oil', image: olive_oil },
            { name: 'Coconut Oil', image: coconut_oil },
            { name: 'Butter', image: butter }
        ]
    }
];