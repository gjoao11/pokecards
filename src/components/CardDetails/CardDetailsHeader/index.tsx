import { Text } from '@/components/common/Text';
import Image from 'next/image';
import { CardDetailsHeaderContainer, CardInfoContainer, PokemonCardInfoContainer } from './styles';

interface CardDetailsHeaderProps {
  card: {
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: string[];
  };
}

export const CardDetailsHeader: React.FC<CardDetailsHeaderProps> = ({ card }) => {
  return (
    <CardDetailsHeaderContainer>
      <CardInfoContainer>
        <Text as="h1" size={4}>
          {card.name}
        </Text>
        <div>
          <p>{card.supertype}</p>
          {!!card.subtypes && <span>&nbsp;-&nbsp;</span>}
          {card.subtypes?.map((subtype, index) => (
            <p key={subtype}>
              {subtype}
              {card.subtypes.length - 1 !== index && <>,&nbsp;</>}
            </p>
          ))}
        </div>
      </CardInfoContainer>

      {card.supertype === 'Pokémon' && (
        <PokemonCardInfoContainer>
          <p>
            HP <span>{card.hp}</span>
          </p>

          {card.types?.map(type => (
            <Image
              key={type}
              src={`/images/energy-types/${type}.png`}
              alt={type}
              width={25}
              height={25}
              loading="lazy"
              title={type}
            />
          ))}
        </PokemonCardInfoContainer>
      )}
    </CardDetailsHeaderContainer>
  );
};
