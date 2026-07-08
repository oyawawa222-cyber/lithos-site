import PageHero from "@/components/PageHero";
import { LiveTourDecor } from "@/components/SceneDecorations";

// 替换为你的海岸海洋背景图链接
const OCEAN_BG = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920";

export default function LiveTourHero() {
  return (
    <PageHero
      bgBase={OCEAN_BG}
      titleLine1="Coastal cores"
      titleLine2="read ocean time"
      leftDesc="Shoreline sediment cores capture marine fossil records, tracking sea level shifts across geological epochs."
      rightDesc="Live guided tours walk coastal outcrops, with real-time sampling markers and stratigraphy explanations."
      ctaText="Book Live Tour"
      DecorComponent={LiveTourDecor}
    />
  );
}