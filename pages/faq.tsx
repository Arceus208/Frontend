import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/navbar/NavBar";
import { FAQElement } from "../components/ui/FAQElement";
import { Footer } from "../components/ui/Footer";
import { Wrapper } from "../components/ui/Wrapper";

interface faqProps {}

const Faq: React.FC<faqProps> = ({}) => {
  return (
    <Box>
      <NavBar></NavBar>
      <Wrapper>
        <Box>
          <Text fontWeight={500} fontSize={30}>
            PAYMENTS
          </Text>
          <FAQElement
            question="HOW DO I PAY WITH CREDIT/DEBIT CARD USING PAYPAL?"
            answer="At Checkout, it will ask you to pay with PayPal. For those of you who don’t have a PayPal account do not worry, you can still pay with your Credit/Debit card at check out. Just click “Pay with PayPal”. It will then direct you to a new PayPal Tab. Then under the “Log In” there will be a button that says “Pay with Credit or Visa Debit Card”. Click on that and it will allow you to pay with your debit or credit card!"
          ></FAQElement>
          <FAQElement
            question="WHAT IS THE CURRENCY ON THE WEBSITE?"
            answer="All prices are in USD."
          ></FAQElement>
          <Text fontWeight={500} fontSize={30} mt={10}>
            ORDERS
          </Text>
          <FAQElement
            question="HOW LONG WILL IT TAKE FOR MY ORDER TO ARRIVE?"
            answer="All orders towards USA and Canada will take about 1-2 weeks. All International orders will take about 2-3 weeks. *Due to the national pandemic, orders placed during this time might take longer than usual."
          ></FAQElement>
          <Text fontWeight={500} fontSize={30} mt={10}>
            SHIPPING
          </Text>
          <FAQElement
            question="WHEN WILL MY ORDER SHIP?"
            answer="If order confirmation does not go out automatically within 12 Business days, please contact us for tracking information."
          ></FAQElement>
          <FAQElement
            question="MY TRACKING INFORMATION SAYS THAT MY ORDER WAS ALREADY DELIVERED BUT I HAVE NOT RECEIVED IT."
            answer="Please fill out our CONTACT FORM. We will do our best to resolve each individual issue here as quickly as possible."
          ></FAQElement>
          <Text fontWeight={500} fontSize={30} mt={10}>
            RETURNS/EXCHANGES
          </Text>
          <FAQElement
            question="All orders are FINAL SALE. No refunds."
            answer="Please make sure to put in your correct shipping address. All items ordered will be shipped to the address provided. We are not responsible for incorrect addresses."
          ></FAQElement>
        </Box>
      </Wrapper>
      <Footer></Footer>
    </Box>
  );
};

export default Faq;
