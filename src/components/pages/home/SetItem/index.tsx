import { useImageShimmer } from '@/hooks/useImageShimmer';
import Image from 'next/image';
import { CardNumber, MainSetInfoContent, SetInfo, SetItemContainer, SetLogo, SetSymbol } from './styles';

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    logo: string;
    symbol: string;
  };
}

interface SetItemProps {
  set: Set;
}

export function SetItem({ set }: SetItemProps) {
  const logoShimmer = useImageShimmer(192, 64);

  return (
    <SetItemContainer>
      <div>
        <SetLogo css={{ '@bp1': { display: 'none' } }}>
          <Image
            src={set.images.logo}
            alt={set.name}
            width={192}
            height={64}
            layout="responsive"
            objectFit="contain"
            loading="lazy"
            placeholder="blur"
            blurDataURL={logoShimmer}
          />
        </SetLogo>

        <SetSymbol css={{ '@bp1': { display: 'block' } }}>
          <Image
            src={set.images.symbol}
            alt={set.name}
            width={32}
            height={32}
            layout="responsive"
            objectFit="contain"
            loading="lazy"
          />
        </SetSymbol>

        <SetInfo>
          <MainSetInfoContent>
            <strong>{set.name}</strong>

            <p>{set.series} series</p>
          </MainSetInfoContent>
        </SetInfo>
      </div>

      <CardNumber>{set.total} cards total</CardNumber>
    </SetItemContainer>
  );
}
