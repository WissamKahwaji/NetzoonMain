import axios from "axios";

const aramexApiUrl =
  "https://ws.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json/CalculateRate";

const pickUpUrl =
  "https://ws.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreatePickup";
const shipmentUrl =
  "https://ws.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreateShipments";

const fetchCitiesUrl =
  "https://ws.aramex.net/ShippingAPI.V2/Location/Service_1_0.svc/json/FetchCities";

const trachPickupUrl =
  "https://ws.sbx.aramex.net/ShippingAPI.V2/Tracking/Service_1_0.svc/json/TrackPickup";

export const calculateRateController = async (req, res) => {
  try {
    const requestBody = req.body;

    const response = await axios.post(aramexApiUrl, requestBody);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createPickUpController = async (req, res) => {
  try {
    // Get the request body from the client
    const requestBody = req.body;

    // Make a POST request to the Aramex API
    const response = await axios.post(pickUpUrl, requestBody);

    // Send the Aramex API response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res.status(500).json({ error: error });
  }
};

export const createShipmentController = async (req, res) => {
  try {
    // Get the request body from the client
    const requestBody = req.body;

    // Make a POST request to the Aramex API
    const response = await axios.post(shipmentUrl, requestBody);

    // Send the Aramex API response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res.status(500).json({ error: error });
  }
};

export const fetchCities = async (req, res) => {
  try {
    // Get the request body from the client
    const { countryCode } = req.query;
    const requestBody = {
      ClientInfo: {
        Source: 24,
        AccountCountryCode: "AE",
        AccountEntity: "DXB",
        AccountPin: "906169",
        AccountNumber: "71923340",
        UserName: "netzoon.2023@gmail.com",
        Password: "Netzoon@123@aramex",
        Version: "v1",
      },
      CountryCode: countryCode,
      NameStartsWith: "",
      State: "",
      Transaction: {
        Reference1: "",
        Reference2: "",
        Reference3: "",
        Reference4: "",
        Reference5: "",
      },
    };
    // Make a POST request to the Aramex API
    const response = await axios.post(fetchCitiesUrl, requestBody);

    // Send the Aramex API response back to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res.status(500).json({ error: error });
  }
};

export const trackPickUp = async (req, res) => {
  try {
    const { pickupId } = req.query;
    const requestBody = {
      ClientInfo: {
        Source: 24,
        AccountCountryCode: "AE",
        AccountEntity: "DXB",
        AccountPin: "116216",
        AccountNumber: "45796",
        UserName: "testingapi@aramex.com",
        Password: "R123456789$r",
        Version: "v1",
      },
      Reference: pickupId,
      Transaction: {
        Reference1: "",
        Reference2: "",
        Reference3: "",
        Reference4: "",
        Reference5: "",
      },
    };
    const response = await axios.post(trachPickupUrl, requestBody);

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error });
  }
};
