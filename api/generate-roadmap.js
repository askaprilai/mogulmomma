// Vercel Serverless Function for OpenAI Roadmap Generation
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { input, timeline } = req.body;

        // Validate input
        if (!input || !timeline) {
            return res.status(400).json({ error: 'Missing required fields: input, timeline' });
        }

        // OpenAI API call
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert business and career coach specializing in helping accomplished women create actionable roadmaps for their goals. You create detailed, personalized 90-day action plans that break down big dreams into specific, manageable steps.

Your expertise includes:
- Career transitions and pivots
- Business creation and scaling
- Skill monetization strategies
- Work-life integration planning
- Strategic goal setting and achievement

Always provide:
1. A clear phase-based breakdown (Phase 1, 2, 3)
2. Specific action items for each phase
3. Timeline with weekly/monthly milestones
4. Immediate next steps (Week 1 focus)
5. Resource recommendations
6. Potential obstacles and solutions
7. Success metrics and checkpoints

Make the roadmap inspiring, specific, and immediately actionable. Format the response in HTML with proper styling for display in a web dashboard.`
                    },
                    {
                        role: 'user',
                        content: `Create a detailed ${timeline} roadmap for this goal:

"${input}"

Please provide a comprehensive action plan that includes:
- Phase breakdown with specific timelines
- Weekly action items for the first month
- Resource requirements and recommendations
- Potential challenges and how to overcome them
- Success metrics and milestones
- Immediate next steps to start today

Format the response in HTML with proper styling for display in a web dashboard.`
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const roadmapHTML = data.choices[0].message.content;

        // Return the generated roadmap
        res.status(200).json({
            success: true,
            roadmap: roadmapHTML,
            input: input,
            timeline: timeline
        });

    } catch (error) {
        console.error('Error generating roadmap:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate roadmap',
            details: error.message
        });
    }
}