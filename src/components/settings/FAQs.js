import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const FAQs = () => {
  const [expanded, setExpanded] = useState(-1); // State to track which question is expanded

  // FAQ data: Array of questions and answers
  const faqData = [
    {
      question: "What is HIV?",
      answer:
        "HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system, specifically targeting CD4 cells (T cells), which help the immune system fight off infections. If left untreated, HIV can lead to the disease AIDS (Acquired Immunodeficiency Syndrome).",
    },
    {
      question: "How is HIV transmitted?",
      answer:
        "HIV can be transmitted through blood, semen, vaginal fluids, rectal fluids, and breast milk. Common modes of transmission include unprotected sexual intercourse, sharing needles or syringes, and from mother to child during childbirth or breastfeeding.",
    },
    {
      question: "Can HIV be cured?",
      answer:
        "Currently, there is no cure for HIV. However, with proper medical care, HIV can be controlled. Antiretroviral therapy (ART) helps people with HIV live longer, healthier lives by reducing the viral load in their blood to undetectable levels, which also prevents transmission to others.",
    },
    {
      question: "What are the symptoms of HIV?",
      answer:
        "In the early stages of HIV infection, symptoms may resemble flu-like symptoms, including fever, swollen lymph nodes, sore throat, rash, muscle and joint aches, and headache. As the infection progresses, without treatment, more severe symptoms may develop.",
    },
    {
      question: "Can you get HIV from kissing or casual contact?",
      answer:
        "No, HIV cannot be transmitted through casual contact like kissing, hugging, shaking hands, sharing utensils, or using public toilets.",
    },
    {
      question: "What should I do if I think I've been exposed to HIV?",
      answer:
        "If you believe you've been exposed to HIV, seek medical attention immediately. Post-exposure prophylaxis (PEP) medication may be prescribed to reduce the risk of HIV infection if started within 72 hours of exposure.",
    },
    {
      question: "How can I protect myself from HIV?",
      answer:
        "You can protect yourself from HIV by practicing safer sex, which includes using condoms consistently and correctly, limiting your number of sexual partners, and getting tested regularly for HIV and other sexually transmitted infections. Avoid sharing needles or syringes and consider pre-exposure prophylaxis (PrEP) if you're at high risk of HIV.",
    },
    {
      question: "Is there discrimination against people living with HIV?",
      answer:
        "Unfortunately, stigma and discrimination against people living with HIV still exist. It's important to educate yourself and others about HIV to combat stigma and promote understanding and support for individuals living with the virus.",
    },
    {
      question: "Can I have children if I'm living with HIV?",
      answer:
        "Yes, with proper medical care and guidance from healthcare providers, many people living with HIV can have children safely. Advances in HIV treatment have significantly reduced the risk of transmitting HIV to a baby during pregnancy, childbirth, or breastfeeding.",
    },
    {
      question: "Where can I get tested for HIV?",
      answer:
        "HIV testing is available at healthcare facilities, community health centers, public health clinics, and through private healthcare providers. Many places offer confidential and anonymous HIV testing, and some organizations provide testing events and resources.",
    },
    {
      question: "What is the difference between HIV and AIDS?",
      answer:
        "HIV is the virus that causes HIV infection. AIDS (Acquired Immunodeficiency Syndrome) is the most severe phase of HIV infection, characterized by a severely damaged immune system and the occurrence of certain opportunistic infections or cancers.",
    },
    {
      question: "How effective is antiretroviral therapy (ART)?",
      answer:
        "ART is highly effective in managing HIV infection. When taken consistently and correctly, ART can reduce the viral load to undetectable levels, allowing individuals to live healthier lives and preventing transmission of the virus to others.",
    },
    {
      question: "What is pre-exposure prophylaxis (PrEP)?",
      answer:
        "PrEP is a preventive treatment for people who do not have HIV but are at high risk of getting it. It involves taking a daily pill that contains two medicines to prevent HIV infection.",
    },
    {
      question: "Can I get HIV from a mosquito bite?",
      answer:
        "No, HIV cannot be transmitted through mosquito bites or other insect bites. HIV is spread through specific human body fluids, not through insects.",
    },
    {
      question: "Can people with HIV lead normal lives?",
      answer:
        "Yes, with proper medical treatment and care, people with HIV can lead long, healthy lives. Adhering to ART, regular medical check-ups, and maintaining a healthy lifestyle are key factors.",
    },
    {
      question: "What is the window period for HIV testing?",
      answer:
        "The window period is the time between potential exposure to HIV and the point when the test can reliably detect HIV infection. Most modern HIV tests can detect the virus within 1 to 3 months after exposure.",
    },
    {
      question: "Can HIV-positive individuals donate blood or organs?",
      answer:
        "People with HIV cannot donate blood or organs to prevent the risk of transmitting the virus to recipients. However, they can receive organ transplants from other HIV-positive donors.",
    },
    {
      question: "How often should I get tested for HIV?",
      answer:
        "The frequency of HIV testing depends on individual risk factors. Generally, people at higher risk should get tested at least once a year, while those at lower risk might get tested less frequently. Consult a healthcare provider for personalized advice.",
    },
    {
      question: "What is post-exposure prophylaxis (PEP)?",
      answer:
        "PEP is a treatment that can prevent HIV infection after a potential exposure. It involves taking antiretroviral medicines within 72 hours of exposure and continuing for 28 days.",
    },
    {
      question: "How does HIV affect the immune system?",
      answer:
        "HIV attacks and destroys CD4 cells (T cells), which are crucial for immune defense. As the number of these cells decreases, the immune system becomes weakened, making it harder for the body to fight off infections and certain cancers.",
    },
    {
      question: "What is the significance of an undetectable viral load?",
      answer:
        "An undetectable viral load means that the amount of HIV in the blood is so low that it cannot be detected by standard tests. This significantly reduces the risk of transmitting the virus to others and indicates effective ART.",
    },
    {
      question: "Can traditional or herbal medicine cure HIV?",
      answer:
        "There is no scientific evidence that traditional or herbal medicines can cure HIV. Effective management of HIV requires antiretroviral therapy (ART) prescribed by a healthcare provider.",
    },
    {
      question: "What is HIV drug resistance?",
      answer:
        "HIV drug resistance occurs when the virus mutates and becomes less responsive to one or more antiretroviral drugs. This can happen if ART is not taken consistently or correctly, making it crucial to adhere to prescribed treatments.",
    },
    {
      question: "How does HIV impact mental health?",
      answer:
        "Living with HIV can affect mental health due to the stigma, discrimination, and chronic nature of the condition. It's important for individuals with HIV to seek support from healthcare providers, counselors, and support groups to manage mental health.",
    },
    {
      question: "What is the global prevalence of HIV?",
      answer:
        "As of recent data, an estimated 38 million people worldwide are living with HIV. The prevalence varies significantly by region, with Sub-Saharan Africa being the most affected.",
    },
    {
      question: "How can HIV-positive individuals reduce the risk of transmission to partners?",
      answer:
        "HIV-positive individuals can reduce the risk of transmission by adhering to ART, maintaining an undetectable viral load, using condoms during sex, and considering PrEP for HIV-negative partners.",
    },
    {
      question: "Are there any vaccines for HIV?",
      answer:
        "Currently, there is no effective vaccine for HIV. Research is ongoing to develop a vaccine, but progress has been challenging due to the complexity of the virus.",
    },
    {
      question: "What role do CD4 cell counts play in HIV management?",
      answer:
        "CD4 cell counts are a key indicator of immune system health in people with HIV. Monitoring CD4 counts helps healthcare providers assess the progression of the infection and the effectiveness of treatment.",
    },
  ];

  const toggleExpand = (index) => {
    if (expanded === index) {
      setExpanded(-1); // Collapse if already expanded
    } else {
      setExpanded(index); // Expand if not expanded
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {faqData.map((faq, index) => (
        <TouchableOpacity key={index} style={styles.faqItem} onPress={() => toggleExpand(index)}>
          <Text style={styles.question}>{`${index + 1}. ${faq.question}`}</Text>
          {expanded === index && <Text style={styles.answer}>{faq.answer}</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e53935", // Red color for questions
  },
  answer: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});

export default FAQs;
