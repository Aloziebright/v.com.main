.container {
  display: grid;
  grid-template-areas:
    "header header"
    "menu content"
    "footer footer";
  grid-template-columns: 9fr 4fr;
  gap: 5px;
  background-color: #2196f3;
}
.container > div {
  background-color: rgba(240, 238, 238, 0.8);
}

.container > div.header {
  grid-area: header;
  height: 70px;
  background-color: aquamarine;
}
.container > div.menu {
  grid-area: menu;
  height: 500px;
}
.container > div.content {
  grid-area: content;
  height: auto;
}
.container > div.footer {
  grid-area: footer;
  height: 110px;
}

.logo {
    text-transform: uppercase;
  font-family: sans-serif;
  font-weight: 20px;
  font-size: medium;
  float: left;
  margin-top: 24px;
  margin-left: 20px;
}

.hamburger-icon {
  float: right;
  margin-top: 20px;
  margin-right: 70px;
  width: 30px;
  height: 30px;
}

.line {
  display: flex;
  background-color: black;
  width: 30px;
  height: 3px;
  justify-items: legacy;
  justify-content: space-between;
  margin: 3px;
}

.search {
  margin-left: 160px;
  margin-top: 12px;
  height: 40px;
}

.home-icon {
  float: right;
  margin-right: 20px;
}

