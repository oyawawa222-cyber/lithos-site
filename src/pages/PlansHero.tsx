import PageHero from "@/components/PageHero";
import { PlanDecor } from "@/components/SceneDecorations";

// 替换为你的湖泊地质背景图链接
const LAKE_BG = "/image/xiawan.jpg";

export default function PlansHero() {
  return (
    <PageHero
      bgBase={LAKE_BG}
      titleLine1="Survey paths"
      titleLine2="across basin floors"
      leftDesc="Lake basins hold layered sediment archives, recording climate cycles preserved in underwater rock beds."
      rightDesc="Custom field planning tools plot survey routes, sampling points and depth transects for basin exploration."
      ctaText="Build Survey Plans"
      DecorComponent={PlanDecor}
    />
  );
}