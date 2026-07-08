import PageHero from "@/components/PageHero";
import { GeologyDecor } from "@/components/SceneDecorations";

// 替换为你的森林岩层背景图链接
const FOREST_BG = "/image/senlin.jpg";

export default function GeologyHero() {
  return (
    <PageHero
      bgBase={FOREST_BG}
      titleLine1="Fault lines"
      titleLine2="split ancient earth"
      leftDesc="Forested bedrock reveals tectonic shifts, where folded rock records continental collision millions of years ago."
      rightDesc="Interactive fault mapping lets you trace crustal movement and identify rock strata beneath forest canopy."
      ctaText="Study Geology Maps"
      DecorComponent={GeologyDecor}
    />
  );
}