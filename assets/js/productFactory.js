"use strict";

var productFactory = angular.module('productFactory', []);

productFactory.factory('productFactory', function () {

    var productFactory = {};

    productFactory.products = [
        {
            productId: 1,
            name: "Ibuprofen",
            category: "Fever & Pain",
            desc: "Ibuprofen is a medication in the nonsteroidal anti-inflammatory drug (NSAID) class that is used for treating pain, fever, and inflammation. It may also be used to close a patent ductus arteriosus in a premature baby. It can be used by mouth or intravenously. It typically begins working within an hour begins working within an hour.",
            image: "CVS30630.jpg;imgb0001.png;PHA06470.jpg",
            price: 3,
            qty: 6,
            variation: "20g,30g,50g,100g"
        },
        {
            productId: 2,
            name: "Aspirin",
            category: "Headache",
            desc: "Aspirin, also known as acetylsalicylic acid, is a medication used to treat pain, fever, or inflammation.    WARNING: Do not use in children younger than age 14 years due to the potential for Reye's syndrome (a life-threatening neurological condition)",
            image: "s-l300.jpg;aspirin.png;Captureas.png",
            price: 4,
            qty: 10,
            variation: "20g,30g,50g,100g"
        },
        {
            productId: 3,
            name: "Dulcolax",
            category: "laxatives &  antacids",
            desc: "Dulcolax® Laxative Tablets are clinically proven to relieve occasional constipation and irregularity overnight, so you can feel like yourself in the morning.It Relieves constipation and irregularity overnight and has Comfort-coated tablets for gentle, predictable constipation relief",
            image: "Capture.png;Iodine Dose.jpg;imgsrv.png",
            price: 5.5,
            qty: 0,
            variation: "20g,30g,50g,100g"
        },
        {
            productId: 4,
            name: "Naproxen",
            category: "Headache",
            desc: "Naproxen is used to relieve pain from various conditions such as headaches, muscle aches, dental pain, and menstrual cramps.For certain conditions (such as arthritis), it may take up to two weeks of taking this drug regularly until you get the full benefit. ",
            image: "s-l300 (1).jpg;Captureqq.png;g-588.png",
            price: 3,
            qty: 6,
            variation: "20g,30g,50g,100g"
        },
        {
            productId: 5,
            name: "Gelusil",
            category: "laxatives &  antacids",
            desc: "This medication is used to treat the symptoms of too much stomach acid such as stomach upset, heartburn, and acid indigestion. It is also used to relieve symptoms of extra gas such as belching, bloating, and feelings of pressure/discomfort in the stomach/gut. Simethicone helps break up gas bubbles in the gut.",
            image: "antacid-gel-250x250.jpg;Capture2222.png;imgsrv (1).png",
            price: 4,
            qty: 10,
            variation: "20g,30g,50g,100g"
        },
        {
            productId: 6,
            name: "Paracetamol",
            category: "Fever & Pain",
            desc: "Paracetamol, also known as acetaminophen or APAP, is a medication used to treat pain and fever. In combination with opioid pain medication, paracetamol is also used for more severe pain such as cancer pain and pain after surgery. It is typically used either by mouth or rectally but is also available intravenously.",
            image: "855-ParacetamolParacetamolo500mg.jpg;imgb0002.png;imgf000008_0001.png",
            price: 5,
            qty: 1,
            variation: "20g,30g,50g,100g"
        }
    ];

    return productFactory;
});
