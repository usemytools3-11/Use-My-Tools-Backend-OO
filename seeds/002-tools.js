exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tools")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tools").insert([
        {
          name: "cordless Drill",
          photo_url:
            "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Tools/Power_Tools/cordless-drills.png",
          price: 9.22,
          lender_id: 1
        },
        {
          name: "Cordless Grinder",
          photo_url:
            "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/fetch/Category_Pages/Tools/Power_Tools/cordless-power-grinders.png",
          price: 12.34,
          lender_id: 2
        },
        {
          name: "Disc Cutter Saw",
          photo_url:
            "https://cdn.shopify.com/s/files/1/0733/5071/products/disc_cutter.jpg?v=1440017257",
          price: 5.3,
          lender_id: 3
        },
        {
          name: "Angle Drill",
          photo_url:
            "http://www.tooldunia.com/image/cache/data/Categories/power-tools/Power-Drill/cheston-cheston-chd-10-angle-drill-and-more-power-tools-at-tool-dunia-comapre-prices-of-power-tools-hand-tools-measuring-tools-and-safety-equipments-1420-600x315.jpeg",
          price: 6.41,
          lender_id: 4
        },
        {
          name: "Angle Grinder",
          photo_url:
            "https://media.screwfix.com/is/image/ae235/cat830694_1?$catImages$",
          price: 9.2,
          lender_id: 5
        },
        {
          name: "Circular Saw",
          photo_url:
            "https://c1.neweggimages.com/ProductImage/03-006-367-01.jpg",
          price: 9.34,
          lender_id: 6
        },
        {
          name: "Electrical Cutout Tool",
          photo_url:
            "https://images.homedepot-static.com/productImages/550c445d-d694-4dbc-8eb1-9ab52e2322c4/svn/milwaukee-rotary-tools-2627-20-64_1000.jpg",
          price: 7.01,
          lender_id: 7
        },
        {
          name: "Electrical Impact Wrench",
          photo_url:
            "https://images.homedepot-static.com/productImages/a5be5f89-b70b-446f-98da-0805ce0950ca/svn/dewalt-impact-wrenches-dw292-64_1000.jpg",
          price: 6.21,
          lender_id: 8
        },
        {
          name: "Cordless Drill",
          photo_url:
            "https://content.propertyroom.com/listings/sellers/seller1/images/homeimgs/dewalt-cordless-drill-driver-1_2822019201844251158.jpg",
          price: 6.55,
          lender_id: 8
        }
      ]);
    });
};
