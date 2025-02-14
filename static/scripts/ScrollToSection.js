const officeBuilding = document.getElementById("office-building");
const officeSector = document.getElementById("Office-Sector");

const healthcare = document.getElementById("healthcare");
const healthcareSector = document.getElementById("Healthcare-Sector");

const datacentre = document.getElementById("data-centre");
const dataSector = document.getElementById("Data-Sector");

const warehouse = document.getElementById("warehouse");
const WarehouseSector = document.getElementById("Warehouses-Sector");

const substation = document.getElementById("substation");
const SubstationSector = document.getElementById("Substation-Sector");

const workshop = document.getElementById("workshop");
const WorkshopSector = document.getElementById("Workshop-Sector");

officeBuilding.addEventListener("click", () => {
  officeSector.scrollIntoView({ behavior: "smooth" });
});

healthcare.addEventListener("click", () => {
  healthcareSector.scrollIntoView({ behavior: "smooth" });
});

datacentre.addEventListener("click", () => {
  dataSector.scrollIntoView({ behavior: "smooth" });
});

warehouse.addEventListener("click", () => {
  WarehouseSector.scrollIntoView({ behavior: "smooth" });
});

substation.addEventListener("click", () => {
  SubstationSector.scrollIntoView({ behavior: "smooth" });
});

workshop.addEventListener("click", () => {
  WorkshopSector.scrollIntoView({ behavior: "smooth" });
});


