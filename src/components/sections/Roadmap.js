import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import DrawSvg from "../DrawSvg";

const Section = styled.section`
  min-height: 100%;
  width: 100vw;
  background-color: ${(props) => props.theme.body};
  position: relative;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  text-transformation: capitalize;
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.text};
  width: fit-content;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const Container = styled.div`
  width: 70%;
  height: 100%;
  background-color: ${(props) => props.theme.body};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 64em) {
    width: 80%;
  }
  @media (max-width: 48em) {
    width: 90%;
  }
`;

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Items = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 48em) {
    width: 90%;
  }

  & > *:nth-of-type(2n + 1) {
    @media (max-width: 48em) {
      justify-content: center;
    }

    div {
      border-radius: 50px 0 50px 0;
      text-align: right;

      @media (max-width: 48em) {
        border-radius: 0 50px 0 50px;
        text-align: left;

        p {
          border-radius: 40px 0 40px;
        }
      }
    }
    p {
      border-radius: 40px 0 40px 0;
    }
  }
  & > *:nth-of-type(2n) {
    justify-content: end;

    @media (max-width: 48em) {
      justify-content: center;
    }

    div {
      border-radius: 0 50px 0 50px;
      text-align: left;
    }
    p {
      border-radius: 0 40px 0 40px;
    }
  }
`;
const Item = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 15px auto;

  @media (max-width: 48em) {
    justify-content: flex-end !important;
  }
`;

const ItemContainer = styled.div`
  width: 40%;
  height: fit-content;
  padding: 1rem;
  border: 3px solid ${(props) => props.theme.text};

  @media (max-width: 48em) {
    width: 70%;
  }
`;

const Box = styled.p`
  height: fit-content;
  background-color: ${(props) => props.theme.carouselColor};
  color: ${(props) => props.theme.text};
  padding: 1rem;
  position: relative;
  border: 1px solid ${(props) => props.theme.text};
`;

const SubTitle = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 600;
  }
`;

const Text = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};

  font-weight: 400;
  margin: 0.5rem 0;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontxs};
  }
`;

const RoadMapItem = ({ title, subtext, addToRef }) => {
  return (
    <Item ref={addToRef}>
      <ItemContainer>
        <Box>
          <SubTitle>{title}</SubTitle>
          <Text>{subtext}</Text>
        </Box>
      </ItemContainer>
    </Item>
  );
};

const Roadmap = () => {
  const revealRefs = useRef([]);
  revealRefs.current = [];
  gsap.registerPlugin(ScrollTrigger);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    let t1 = gsap.timeline();
    revealRefs.current.forEach((el, index) => {
      t1.fromTo(
        el.childNodes[0],
        {
          y: "0",
        },
        {
          y: "-30",

          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center+=200px",
            end: "bottom bottom",
            scrub: true,
            // markers: true
          },
        }
      );
    });

    return () => {};
  }, []);

  return (
    <Section id="roadmap">
      <Title>Roadmap</Title>
      <Container>
        <SvgContainer>
          <DrawSvg />
        </SvgContainer>
        <Items>
          <Item>&nbsp;</Item>
          <RoadMapItem
            addToRef={addToRefs}
            title="Community Launch"
            subtext="The Nifty Dogs Community is born on Instagram.com/nifty_dogs The account is design to help educate followers on NFTs and the Nifty Dogs Project progress."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Website Launch"
            subtext="The mission is release to the public and the Nifty Dogs project details are laid out at niftydogs.io."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Smart Contract Deployment"
            subtext="The Nifty Dogs smart contract is created, audited and deployed on the ethereum blockchain and incorporates all holder values for the future NFT holders."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Biscuit Awards(Tokens)"
            subtext="A second smart contract will be created audited and deployed on the ethereum blockchain to create the project tokens. These tokens or “biscuits” will be used for rewards and monetized within the Nifty Dogs community."
          />
          
          <RoadMapItem
            addToRef={addToRefs}
            title="Bootcamp"
            subtext="The Nifty Dogs project will kick off with a GoFundMe to helps put our ﬁrst dog through training with our very own certiﬁed trainer. This will be the ﬁrst of many more to come."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Whitelist Minting"
            subtext="The ﬁrst collection of 777 unique Nifty Dogs are released to an exclusive whitelist from engaged community members in Discord."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Public Minting"
            subtext="The remainder of ﬁrst collection can be minted from the niftydogs.io website and 3rd party sales can be found on OpenSea."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Sell Out!"
            subtext="Once the ﬁrst collection sells out, the Nifty Dogs DAO will be created and all 1st collection NFT holders will have stakeholder rights in the DAO with 1 vote per NFT."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Dao Donation"
            subtext="A donation of $10,000 goes towards the building of the mega kennel where Service Dogs and Veterans get trained and paired together."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Monthly Giveaways"
            subtext="Each month NFT holders are automatically entered into a rafﬂe with the chance to win Biscuits, prises and other exclusive offers."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Dao Voting Day"
            subtext="Various voting days will be announced where NFT holders decide on the overall direction of the project by voting on topics like development, community engagement, philanthropic decisions, how sale revenue is spent on each collection released."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="To Nifty And Beyond"
            subtext="Future development and gamiﬁcation will take place. The DAO will consider voting on topics like, donations, tokenization, art creation, 3D modeling, and metaverse integrations."
          />
          <RoadMapItem
            addToRef={addToRefs}
            title="Next Collection Released"
            subtext="TBD on community consensus."
          />
        </Items>
      </Container>
    </Section>
  );
};

export default Roadmap;
