import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import { BackPageButtonContainer } from './styles';

export function BackPageButton() {
  const { back } = useRouter();

  return (
    <BackPageButtonContainer type="button" onClick={back}>
      <ArrowLeft size={16} weight="bold" />
      <span>Back</span>
    </BackPageButtonContainer>
  );
}
