import axios from "axios";

const aramexApiUrl =
  "https://ws.aramex.net/ShippingAPI.V2/RateCalculator/Service_1_0.svc/json/CalculateRate";

const pickUpUrl =
  "https://ws.sbx.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreatePickup";
const shipmentUrl =
  "https://ws.sbx.aramex.net/ShippingAPI.V2/Shipping/Service_1_0.svc/json/CreateShipments";

const fetchCitiesUrl =
  "https://ws.aramex.net/ShippingAPI.V2/Location/Service_1_0.svc/json/FetchCities";

const trachPickupUrl =
  "https://ws.sbx.aramex.net/ShippingAPI.V2/Tracking/Service_1_0.svc/json/TrackPickup";

export const calculateRateController = async (req, res) => {
  try {
    const {
      originAddress,
      destinationAddress,
      actualWeightValue,
      numberOfPieces,
      preferredCurrencyCode,
    } = req.body;
    const requestBody = {
      OriginAddress: {
        Line1: originAddress.line1,
        Line2: null,
        Line3: null,
        City: originAddress.city,
        StateOrProvinceCode: null,
        PostCode: "",
        CountryCode: originAddress.countryCode,
        Longitude: 0,
        Latitude: 0,
        BuildingNumber: null,
        BuildingName: null,
        Floor: null,
        Apartment: null,
        POBox: null,
        Description: null,
      },
      DestinationAddress: {
        Line1: destinationAddress.line1,
        Line2: null,
        Line3: null,
        City: destinationAddress.city,
        StateOrProvinceCode: null,
        PostCode: "",
        CountryCode: destinationAddress.countryCode,
        Longitude: 0,
        Latitude: 0,
        BuildingNumber: null,
        BuildingName: null,
        Floor: null,
        Apartment: null,
        POBox: null,
        Description: null,
      },
      ShipmentDetails: {
        Dimensions: null,
        ActualWeight: {
          Unit: "KG",
          Value: actualWeightValue,
        },
        ChargeableWeight: {
          Unit: "KG",
          Value: 0,
        },
        DescriptionOfGoods: null,
        GoodsOriginCountry: null,
        NumberOfPieces: numberOfPieces,
        ProductGroup: "DOM",
        ProductType: "ONP",
        PaymentType: "P",
        PaymentOptions: null,
        CustomsValueAmount: null,
        CashOnDeliveryAmount: null,
        InsuranceAmount: null,
        CashAdditionalAmount: null,
        CashAdditionalAmountDescription: null,
        CollectAmount: null,
        Services: "",
        Items: null,
        DeliveryInstructions: null,
        AdditionalProperties: null,
        ContainsDangerousGoods: false,
      },
      PreferredCurrencyCode: preferredCurrencyCode,
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
      Transaction: null,
    };

    const response = await axios.post(aramexApiUrl, requestBody);

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const createPickupWithShipmentController = async (req, res) => {
  try {
    const {
      pickupAddress,
      pickupContact,
      pickupLocation,
      pickupDate,
      readyTime,
      lastPickupTime,
      closingTime,
      pickupItems,
      shipper,
      consignee,
      shippingDateTime,
      dueDate,
      Items,
    } = req.body;

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
      LabelInfo: {
        ReportID: 9201,
        ReportType: "URL",
      },
      Pickup: {
        PickupAddress: {
          Line1: pickupAddress.line1,
          Line2: pickupAddress.line2,
          Line3: "",
          City: pickupAddress.city,
          StateOrProvinceCode: pickupAddress.stateOrProvinceCode,
          PostCode: "",
          CountryCode: pickupAddress.countryCode,
          Longitude: 0,
          Latitude: 0,
          BuildingNumber: null,
          BuildingName: null,
          Floor: null,
          "Apartme nt": null,
          POBox: null,
          Description: null,
        },
        PickupContact: {
          Department: "Test Department",
          PersonName: pickupContact.personName,
          Title: pickupContact.title,
          CompanyName: pickupContact.companyName,
          PhoneNumber1: `${pickupContact.phoneNumber1}`,
          PhoneNumber1Ext: null,
          PhoneNumber2: null,
          PhoneNumber2Ext: null,
          FaxNumber: null,
          CellPhone: `${pickupContact.phoneNumber1}`,
          EmailAddress: pickupContact.emailAddress,
          Type: null,
        },
        PickupLocation: pickupLocation,
        PickupDate: pickupDate,
        ReadyTime: readyTime,
        LastPickupTime: lastPickupTime,
        ClosingTime: closingTime,
        Comments: "",
        Reference1: "001",
        Reference2: "",
        Vehicle: "Car",
        Shipments: null,
        PickupItems: [
          {
            ProductGroup: "DOM",
            ProductType: "ONP",
            NumberOfShipments: 1,
            PackageType: "Box",
            Payment: "P",
            ShipmentWeight: {
              Unit: "KG",
              Value: pickupItems.shipmentWeight.value,
            },
            ShipmentVolume: null,
            NumberOfPieces: pickupItems.numberOfPieces,
            CashAmount: null,
            ExtraCharges: null,
            ShipmentDimensions: {
              Length: 0,
              Width: 0,
              Height: 0,
              Unit: "",
            },
            Comments: "Test",
          },
        ],
        Status: "Ready",
        ExistingShipments: null,
        Branch: "",
        RouteCode: "",
      },
      Transaction: {
        Reference1: "",
        Reference2: "",
        Reference3: "",
        Reference4: "",
        Reference5: "",
      },
    };

    // Make a POST request to the Aramex API
    const response = await axios.post(pickUpUrl, requestBody);
    if (response.data.HasErrors === false) {
      const requestShipmentBody = {
        Shipments: [
          {
            Reference1: null,
            Reference2: null,
            Reference3: null,
            Shipper: {
              Reference1: null,
              Reference2: null,
              AccountNumber: "45796",
              PartyAddress: {
                Line1: shipper.partyAddress.line1,
                Line2: shipper.partyAddress.line2,
                Line3: "",
                City: shipper.partyAddress.city,
                StateOrProvinceCode: shipper.partyAddress.stateOrProvinceCode,
                PostCode: "",
                CountryCode: shipper.partyAddress.countryCode,
                Longitude: 0,
                Latitude: 0,
                BuildingNumber: null,
                BuildingName: null,
                Floor: null,
                "Apartme nt": null,
                POBox: null,
                Description: null,
              },
              Contact: {
                Department: shipper.contact.department,
                PersonName: shipper.contact.personName,
                Title: null,
                CompanyName: shipper.contact.companyName,
                PhoneNumber1: shipper.contact.phoneNumber1,
                PhoneNumber1Ext: null,
                PhoneNumber2: null,
                PhoneNumber2Ext: null,
                FaxNumber: null,
                CellPhone: shipper.contact.cellPhone,
                EmailAddress: shipper.contact.email,
                Type: null,
              },
            },
            Consignee: {
              Reference1: null,
              Reference2: null,
              AccountNumber: null,
              PartyAddress: {
                Line1: consignee.partyAddress.line1,
                Line2: consignee.partyAddress.line2,
                Line3: "",
                City: consignee.partyAddress.city,
                StateOrProvinceCode: consignee.partyAddress.stateOrProvinceCode,
                PostCode: "",
                CountryCode: consignee.partyAddress.countryCode,
                Longitude: 0,
                Latitude: 0,
                BuildingNumber: null,
                BuildingName: null,
                Floor: null,
                Apartment: null,
                POBox: null,
                Description: null,
              },
              Contact: {
                Department: consignee.contact.department,
                PersonName: consignee.contact.personName,
                Title: null,
                CompanyName: consignee.contact.companyName,
                PhoneNumber1: consignee.contact.phoneNumber1,
                PhoneNumber1Ext: null,
                PhoneNumber2: null,
                PhoneNumber2Ext: null,
                FaxNumber: null,
                CellPhone: consignee.contact.cellPhone,
                EmailAddress: consignee.contact.emailAddress,
                Type: null,
              },
            },
            ThirdParty: null,
            ShippingDateTime: shippingDateTime,
            DueDate: dueDate,
            Comments: null,
            PickupLocation: null,
            OperationsInstructions: null,
            AccountingInstrcutions: null,
            Details: {
              Dimensions: null,
              ActualWeight: {
                Unit: "KG",
                Value: pickupItems.shipmentWeight.value,
              },
              ChargeableWeight: null,
              DescriptionOfGoods: "items",
              GoodsOriginCountry: "AE",
              NumberOfPieces: 1,
              ProductGroup: "DOM",
              ProductType: "ONP",
              PaymentType: "P",
              PaymentOptions: null,
              CustomsValueAmount: null,
              CashOnDeliveryAmount: null,
              InsuranceAmount: null,
              CashAdditionalAmount: null,
              CashAdditionalAmountDescription: null,
              "CollectAmou nt": null,
              Services: null,
              Items: Items,
              DeliveryInstructions: null,
            },
            Attachments: null,
            ForeignHAWB: null,
            TransportType: 0,
            PickupGUID: response.data.ProcessedPickup.GUID,
            Number: null,
            ScheduledDelivery: null,
          },
        ],
        LabelInfo: {
          ReportID: 9729,
          ReportType: "URL",
        },
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
        Transaction: {
          Reference1: "001",
          Reference2: "",
          Reference3: "",
          Reference4: "",
          Reference5: "",
        },
      };
      const shipmentResponse = await axios.post(
        shipmentUrl,
        requestShipmentBody
      );
      return res.json(shipmentResponse.data);
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    res.status(500).json({ error: error });
  }
};

export const createPickUpController = async (req, res) => {
  try {
    const {
      pickupAddress,
      pickupContact,
      pickupLocation,
      pickupDate,
      readyTime,
      lastPickupTime,
      closingTime,
      pickupItems,
    } = req.body;

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
      LabelInfo: {
        ReportID: 9201,
        ReportType: "URL",
      },
      Pickup: {
        PickupAddress: {
          Line1: pickupAddress.line1,
          Line2: pickupAddress.line2,
          Line3: "",
          City: pickupAddress.city,
          StateOrProvinceCode: pickupAddress.stateOrProvinceCode,
          PostCode: "",
          CountryCode: pickupAddress.countryCode,
          Longitude: 0,
          Latitude: 0,
          BuildingNumber: null,
          BuildingName: null,
          Floor: null,
          "Apartme nt": null,
          POBox: null,
          Description: null,
        },
        PickupContact: {
          Department: "Test Department",
          PersonName: pickupContact.personName,
          Title: pickupContact.title,
          CompanyName: pickupContact.companyName,
          PhoneNumber1: pickupContact.phoneNumber1,
          PhoneNumber1Ext: null,
          PhoneNumber2: null,
          PhoneNumber2Ext: null,
          FaxNumber: null,
          CellPhone: pickupContact.cellPhone,
          EmailAddress: pickupContact.emailAddress,
          Type: null,
        },
        PickupLocation: pickupLocation,
        PickupDate: pickupDate,
        ReadyTime: readyTime,
        LastPickupTime: lastPickupTime,
        ClosingTime: closingTime,
        Comments: "",
        Reference1: "001",
        Reference2: "",
        Vehicle: "Car",
        Shipments: null,
        PickupItems: [
          {
            ProductGroup: "DOM",
            ProductType: "ONP",
            NumberOfShipments: 1,
            PackageType: "Box",
            Payment: "P",
            ShipmentWeight: {
              Unit: "KG",
              Value: pickupItems.shipmentWeight.value,
            },
            ShipmentVolume: null,
            NumberOfPieces: pickupItems.numberOfPieces,
            CashAmount: null,
            ExtraCharges: null,
            ShipmentDimensions: {
              Length: 0,
              Width: 0,
              Height: 0,
              Unit: "",
            },
            Comments: "Test",
          },
        ],
        Status: "Ready",
        ExistingShipments: null,
        Branch: "",
        RouteCode: "",
      },
      Transaction: {
        Reference1: "",
        Reference2: "",
        Reference3: "",
        Reference4: "",
        Reference5: "",
      },
    };

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
