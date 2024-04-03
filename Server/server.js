import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.get("/categories/:categoryname/products/:n/page", async (req, res) => {
  console.log(req.url);
  var n = parseInt(req.params.n);
  var category = req.params.categoryname;
  var pageNumber = req.query.pageNumber;
  if (n <= 10) {
    pageNumber = 0;
  }
  try {
    let body = {
      companyName: "SRM Institute of Science and Technology, Ramapuram",
      clientID: "5989c9e2-1f67-4749-b9e6-6826bc55c016",
      clientSecret: "kErPQWuoBbKlmdDE",
      ownerName: "Yuvan Shanmuga Raj T",
      ownerEmail: "yt2885@srmist.edu.in",
      rollNo: "RA2111003020360",
    };
    let tokenResponse = await fetch("http://20.244.56.144/test/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let token = await tokenResponse.json();
    let data = [];
    let companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    for (let company of companies) {
      let response = await fetch(
        `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${n}&minPrice=1&maxPrice=10000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      console.log(token);
      let companyData = await response.json();
      data = [...data, ...companyData];
    }
    data.sort((a, b) => b.rating - a.rating);
    let slicedData = data.slice(0, n);
    let start = parseInt(pageNumber) * 10 + 1;
    let end = Math.min(parseInt(start) + 10, slicedData.length - 1);
    console.log(start, end);
    let ans = [];
    for (let i = start; i < end; i++) {
      ans.push(slicedData[parseInt(i)]);
    }
    res.send(ans);
  } catch (err) {
    res.send({ err: err.message });
  }
});

app.get("/categories/:categoryname/products/:n", async (req, res) => {
  var n = parseInt(req.params.n);
  var category = req.params.categoryname;
  if (n > 10) {
    res.redirect(`/categories/${category}/products/${n}/page?pageNumber=0`);
  } else {
    try {
      let body = {
        companyName: "SRM Institute of Science and Technology, Ramapuram",
        clientID: "5989c9e2-1f67-4749-b9e6-6826bc55c016",
        clientSecret: "kErPQWuoBbKlmdDE",
        ownerName: "Yuvan Shanmuga Raj T",
        ownerEmail: "yt2885@srmist.edu.in",
        rollNo: "RA2111003020360",
      };
      let tokenResponse = await fetch("http://20.244.56.144/test/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let token = await tokenResponse.json();
      let data = [];
      let companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
      for (let company of companies) {
        let response = await fetch(
          `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${n}&minPrice=1&maxPrice=10000`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        let companyData = await response.json();
        data = [...data, ...companyData];
      }
      data.sort((a, b) => b.rating - a.rating);
      let slicedData = data.slice(0, n);
      let ans = [];
      for (let i = 0; i < slicedData.length; i++) {
        ans.push(data[i]);
      }
      res.send(ans);
    } catch (err) {
      res.send({ err: err.message });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
