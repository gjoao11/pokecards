import { CardFormatsContainer, FormatItem, FormatsContainer, FormatTag, RegulationMark } from './styles';

interface CardFormatsProps {
  card: {
    regulationMark: string;
    legalities: {
      unlimited: string;
      standard: string;
      expanded: string;
    };
  };
}

export const CardFormats: React.FC<CardFormatsProps> = ({ card }) => {
  return (
    <CardFormatsContainer>
      {!!card.regulationMark && (
        <RegulationMark>
          <h3>Regulation Mark</h3>
          <p>{card.regulationMark}</p>
        </RegulationMark>
      )}

      <FormatsContainer>
        <h3>Formats:</h3>

        <div>
          <FormatItem>
            {card.legalities.standard === 'Legal' ? (
              <FormatTag legality="legal">Legal</FormatTag>
            ) : (
              <FormatTag legality="notLegal">Not legal</FormatTag>
            )}
            <p>Standard</p>
          </FormatItem>

          <FormatItem>
            {card.legalities.expanded === 'Legal' ? (
              <FormatTag legality="legal">Legal</FormatTag>
            ) : (
              <FormatTag legality="notLegal">Not legal</FormatTag>
            )}
            <p>Expanded</p>
          </FormatItem>

          <FormatItem>
            {card.legalities.unlimited === 'Legal' ? (
              <FormatTag legality="legal">Legal</FormatTag>
            ) : (
              <FormatTag legality="notLegal">Not legal</FormatTag>
            )}
            <p>Unlimited</p>
          </FormatItem>
        </div>
      </FormatsContainer>
    </CardFormatsContainer>
  );
};
