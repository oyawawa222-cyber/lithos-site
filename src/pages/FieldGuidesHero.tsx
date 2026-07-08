import PageHero from "@/components/PageHero";
import { FieldGuideDecor } from "@/components/SceneDecorations";

// 替换为你的沙漠背景图链接
const DESERT_BG = "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=1920";

export default function FieldGuidesHero() {
  return (
    <PageHero
      bgBase={DESERT_BG}
      titleLine1="Desert strata"
      titleLine2="carved by wind"
      leftDesc="Arid plateaus preserve ancient rock formations, exposed by millennia of wind erosion and rare flash floods."
      rightDesc="Our field guide toolkit maps desert outcrops, identifying sedimentary layers and mineral deposits hidden beneath sand dunes."
      ctaText="Explore Field Maps"
      DecorComponent={FieldGuideDecor}
    />
  );
}