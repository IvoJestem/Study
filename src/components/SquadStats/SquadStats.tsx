import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Player } from "../../types/Player";

interface SquadStatsProps {
  players: Player[];
}

const premiumColors = [
  "#00B4D8",
  "#FF007A", 
  "#0A1929", 
  "#f59e0b", 
  "#10b981", 
  "#8b5cf6", 
  "#f43f5e", 
  "#06b6d4", 
];

export const SquadStats: React.FC<SquadStatsProps> = ({ players }) => {
  const positionData = players.reduce((acc: Record<string, number>, player) => {
    acc[player.position] = (acc[player.position] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(positionData).map((pos, index) => ({
    id: index,
    value: positionData[pos],
    label: pos,
  }));

  if (players.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <AnalyticsIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
        <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
          Zbuduj swoją kadrę, aby odblokować zaawansowane wykresy analityczne.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
        <AnalyticsIcon sx={{ color: "#00B4D8", fontSize: 35 }} />
        <Typography variant="h5" sx={{ fontWeight: 900, color: "#0A1929" }}>
          Głębia Składu
        </Typography>
      </Box>
      
      <Box sx={{ width: "100%", height: 320, display: "flex", justifyContent: "center" }}>
        <PieChart
          colors={premiumColors}
          series={[
            {
              data: chartData,
              innerRadius: 65, 
              outerRadius: 120,
              paddingAngle: 4, 
              cornerRadius: 8, 
              highlightScope: { fade: "global", highlight: "item" }, 
              faded: { innerRadius: 55, additionalRadius: -10, color: "gray" },
            },
          ]}
          slotProps={{
            legend: {
              position: { vertical: "middle", horizontal: "end" },
            },
          }}
          sx={{
            "& .MuiChartsLegend-series text": {
              fontWeight: "800 !important",
              fill: "#0A1929 !important",
              fontSize: "14px !important",
            }
          }}
          width={650}
          height={300}
          margin={{ right: 200 }} 
        />
      </Box>
    </Box>
  );
};