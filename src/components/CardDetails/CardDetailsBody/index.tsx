import Image from 'next/image';
import { AbilityTag, CardDetailsBodyContainer, InfoBox, InfoText, InfoTitle, MoveCost, MoveDamage } from './styles';

interface CardDetailsBodyProps {
  card: {
    rules: string[];
    abilities: {
      name: string;
      text: string;
      type: string;
    }[];
    attacks: {
      name: string;
      cost: string[];
      damage: string;
      text: string;
    }[];
  };
}

export const CardDetailsBody: React.FC<CardDetailsBodyProps> = ({ card }) => {
  return (
    <CardDetailsBodyContainer>
      {!!card.rules &&
        card.rules?.map(rule => (
          <InfoBox key={rule}>
            <InfoText>{rule}</InfoText>
          </InfoBox>
        ))}

      {!!card.abilities &&
        card.abilities?.map(ability => (
          <InfoBox key={ability.name}>
            <InfoTitle>
              <AbilityTag>{ability.type}</AbilityTag>
              {ability.name}
            </InfoTitle>

            <InfoText>{ability.text}</InfoText>
          </InfoBox>
        ))}

      {!!card.attacks &&
        card.attacks?.map(attack => (
          <InfoBox key={attack.name}>
            <InfoTitle>
              <MoveCost>
                {attack?.cost.map((energy, index) => (
                  <Image
                    key={index}
                    src={`/images/energy-types/${energy}.png`}
                    alt={energy}
                    width={25}
                    height={25}
                    loading="lazy"
                    title={energy}
                  />
                ))}
              </MoveCost>

              {attack?.name}

              <MoveDamage>{attack?.damage}</MoveDamage>
            </InfoTitle>

            {!!attack.text && <InfoText>{attack?.text}</InfoText>}
          </InfoBox>
        ))}
    </CardDetailsBodyContainer>
  );
};
