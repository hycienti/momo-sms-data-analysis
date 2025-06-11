# Mobile Money Dashboard

A comprehensive analytics dashboard for mobile money transactions built with HTML, CSS, Tailwind, and vanilla JavaScript.

## Project Structure

Frontend/

```
├── index.html                          # Main HTML file with dashboard layout
├── 
├── js/
│   ├── main.js                          # Main JavaScript coordinator
│   ├── data/
│   │   └── mockData.js                # Sample transaction data
│   │   └── apiData.js                 # Transaction data from our endpoint
│   ├── utils/
│   │   ├── calculations.js            # Statistical calculations
│   │   └── tabManager.js              # Tab navigation functionality
│   └── components/
│       ├── statsCards.js              # Statistics cards rendering
│       ├── charts.js                  # Chart visualizations
│       ├── contactAnalytics.js        # Contact-based analytics
│       ├── timePatterns.js            # Time-based analysis
│       ├── financialInsights.js       # Financial insights and patterns
│       └── transactionList.js         # Transaction list and filtering
```

## Detailed Function Documentation

### Main Entry Point (`main.js`)

#### `DOMContentLoaded Event Listener`
**Purpose**: Initializes the entire dashboard when the page loads
**Functionality**: 
- Renders all dashboard components
- Sets up event listeners for user interactions
- Initializes all analytics modules

#### `setupEventListeners()`
**Purpose**: Configures all interactive elements on the dashboard
**Functionality**:
- Search input event listener for real-time transaction filtering
- Filter dropdown change listener
- Tab button click handlers for navigation
- Modal close event handlers

---

### Data Layer (`js/data/mockData.js`)

#### `mockData` (Array)
**Purpose**: Contains sample mobile money transaction data
**Structure**: Each transaction object includes:
- `id`: Unique transaction identifier
- `address`: Service provider (e.g., "M-Money")
- `body`: Full SMS message content
- `contact_name`: Contact display name
- `date`: Transaction timestamp
- `extracted_amount`: Parsed transaction amount
- `sender_or_receiver`: Transaction counterparty name
- `transaction_type`: "received" or "payment"
- `readable_date`: Human-readable date format

---

### Calculations Utility (`js/utils/calculations.js`)

#### `calculateStats()`
**Purpose**: Computes comprehensive transaction statistics
**Returns**: Object containing:
- `total`: Sum of all transaction amounts
- `received`: Total money received
- `payments`: Total money paid out
- `uniqueContacts`: Number of distinct transaction partners
- `avgTransaction`: Average transaction amount
- `netFlow`: Net money flow (received - payments)

**Algorithm**:
1. Iterates through all transactions
2. Sums amounts by transaction type
3. Counts unique contacts using Set data structure
4. Calculates derived metrics

#### `extractBalance(body)`
**Purpose**: Parses account balance from SMS message text
**Parameters**: 
- `body` (string): Full SMS message content
**Returns**: Parsed balance amount or null if not found
**Algorithm**: Uses regex pattern `/balance[:\s]*([0-9,]+)\s*RWF/i` to extract balance information

---

### Tab Management (`js/utils/tabManager.js`)

#### `switchTab(tabName)`
**Purpose**: Handles navigation between dashboard tabs
**Parameters**:
- `tabName` (string): Target tab identifier ("overview", "contacts", "patterns", "insights")
**Functionality**:
1. Updates active tab button styling
2. Shows/hides appropriate content sections
3. Triggers tab-specific rendering with 100ms delay
4. Updates global `currentTab` variable

**Tab-Specific Rendering**:
- `overview`: Renders main charts
- `contacts`: Renders contact analytics
- `patterns`: Renders time patterns
- `insights`: Renders financial insights

---

### Statistics Cards (`js/components/statsCards.js`)

#### `renderStatsCards()`
**Purpose**: Creates and displays key metric cards at the top of dashboard
**Functionality**:
1. Calls `calculateStats()` to get current metrics
2. Defines card configuration array with:
   - Title and value
   - Subtitle and icon
   - Color gradient classes
3. Generates HTML for each card with hover animations
4. Injects cards into `statsCards` container

**Card Types**:
- Total Volume: Sum of all transactions
- Money Received: Incoming funds total
- Payments Made: Outgoing funds total
- Net Flow: Difference between received and paid (with conditional styling)
- Average Transaction: Mean transaction amount
- Unique Contacts: Count of distinct transaction partners

---

### Charts Component (`js/components/charts.js`)

#### `renderCharts()`
**Purpose**: Orchestrates rendering of all overview charts
**Calls**: `renderVolumeChart()`, `renderDistributionChart()`, `renderTimelineChart()`

#### `renderVolumeChart()`
**Purpose**: Creates bar chart comparing received vs payment volumes
**Technology**: Chart.js bar chart
**Data Processing**:
1. Groups transactions by type
2. Sums amounts for each type
3. Creates dataset with blue/green color scheme

#### `renderDistributionChart()`
**Purpose**: Creates doughnut chart showing transaction count distribution
**Technology**: Chart.js doughnut chart
**Data Processing**:
1. Counts transactions by type
2. Uses purple/orange color scheme
3. Positions legend at bottom

#### `renderTimelineChart()`
**Purpose**: Creates dual-axis line chart showing transaction amounts and running balance over time
**Technology**: Chart.js line chart with dual y-axes
**Algorithm**:
1. Sorts transactions chronologically
2. Calculates running balance using extracted balance or computed values
3. Creates two datasets:
   - Transaction amounts (left axis)
   - Running balance (right axis)
4. Formats dates for x-axis labels

---

### Contact Analytics (`js/components/contactAnalytics.js`)

#### `renderContactAnalytics()`
**Purpose**: Orchestrates all contact-based analysis
**Calls**: `renderTopContacts()`, `renderContactChart()`, `renderTransactionHeatmap()`

#### `renderTopContacts()`
**Purpose**: Displays ranked list of transaction partners
**Algorithm**:
1. Groups transactions by contact name
2. Calculates totals, received, sent amounts, and transaction counts
3. Sorts contacts by total transaction volume
4. Generates HTML list with avatar initials and financial summaries

#### `renderContactChart()`
**Purpose**: Creates grouped bar chart showing received/sent amounts per contact
**Technology**: Chart.js grouped bar chart
**Data Processing**:
1. Aggregates data by contact and transaction type
2. Creates separate datasets for received (green) and sent (orange) amounts
3. Uses horizontal grouped bars for easy comparison

#### `renderTransactionHeatmap()`
**Purpose**: Creates visual heatmap showing transaction activity by day and hour
**Algorithm**:
1. Creates 7x24 grid (days × hours)
2. Counts transactions for each day-hour combination
3. Calculates intensity based on maximum count
4. Generates HTML grid with background color intensity
5. Adds tooltips showing transaction counts

---

### Time Patterns (`js/components/timePatterns.js`)

#### `renderTimePatterns()`
**Purpose**: Orchestrates all time-based analysis
**Calls**: `renderHourlyChart()`, `renderDailyChart()`, `renderFrequencyAnalysis()`

#### `renderHourlyChart()`
**Purpose**: Shows transaction volume distribution across 24 hours
**Technology**: Chart.js line chart with area fill
**Algorithm**:
1. Creates 24-element array (one per hour)
2. Extracts hour from each transaction timestamp
3. Sums transaction amounts by hour
4. Uses purple color scheme with smooth tension curves

#### `renderDailyChart()`
**Purpose**: Shows transaction volume distribution across days of week
**Technology**: Chart.js bar chart
**Algorithm**:
1. Creates 7-element arrays for volume and count
2. Groups transactions by day of week (0=Sunday)
3. Uses HSL color generation for varied bar colors
4. Displays volume with rounded corners

#### `renderFrequencyAnalysis()`
**Purpose**: Analyzes time intervals between consecutive transactions
**Algorithm**:
1. Sorts transactions chronologically
2. Calculates time differences between consecutive transactions
3. Converts milliseconds to hours
4. Computes average, minimum, and maximum intervals
5. Displays metrics in summary cards

---

### Financial Insights (`js/components/financialInsights.js`)

#### `renderFinancialInsights()`
**Purpose**: Orchestrates comprehensive financial analysis
**Calls**: `renderSizeChart()`, `renderCashFlowChart()`, `renderFinancialSummary()`

#### `renderSizeChart()`
**Purpose**: Categorizes transactions by amount ranges
**Technology**: Chart.js doughnut chart
**Categories**:
- Small: 0-500 RWF
- Medium: 500-1500 RWF  
- Large: 1500+ RWF
**Algorithm**: Iterates through transactions and counts by size category

#### `renderCashFlowChart()`
**Purpose**: Shows running balance over time
**Technology**: Chart.js line chart with area fill
**Algorithm**:
1. Sorts transactions chronologically
2. Maintains running balance calculation
3. Handles both received (+) and payment (-) transactions
4. Creates timeline with balance snapshots
5. Uses indigo color scheme

#### `renderFinancialSummary()`
**Purpose**: Displays key financial metrics
**Metrics Calculated**:
- Average transaction amount
- Largest single transaction
- Smallest single transaction
- Transaction velocity (transactions per day)
**Algorithm**:
1. Extracts amounts array from all transactions
2. Uses Math.max/Math.min for extremes
3. Calculates date range for velocity computation
4. Formats all values with appropriate colors

---

### Transaction List (`js/components/transactionList.js`)

#### `renderTransactionList()`
**Purpose**: Displays paginated, filterable transaction list
**Functionality**:
1. Uses global `filteredData` array
2. Updates transaction count display
3. Generates HTML for each transaction with:
   - Direction icon (up/down arrow)
   - Contact name and date
   - Amount with appropriate +/- sign
   - Transaction type badge
4. Adds click handlers for transaction details

#### `filterTransactions()`
**Purpose**: Implements real-time search and filtering
**Filter Criteria**:
- Text search: Matches contact names and message bodies
- Type filter: "all", "received", or "payment"
**Algorithm**:
1. Gets current search term and filter type
2. Applies both filters simultaneously using Array.filter()
3. Updates global `filteredData` array
4. Triggers list re-rendering

#### `showTransactionDetails(transactionId)`
**Purpose**: Displays detailed transaction information in modal
**Functionality**:
1. Finds transaction by ID
2. Extracts balance from message body if available
3. Populates modal with formatted transaction details
4. Shows modal with fade-in animation

---

## Global Variables

### `filteredData`
**Purpose**: Maintains current filtered transaction set
**Scope**: Used by transaction list and filtering functions
**Initial Value**: Copy of complete `mockData` array

### `currentTab`
**Purpose**: Tracks active dashboard tab
**Values**: "overview", "contacts", "patterns", "insights"
**Usage**: Referenced by tab manager for state tracking

### `charts`
**Purpose**: Stores Chart.js instances for cleanup
**Structure**: Object with chart references
**Usage**: Prevents memory leaks by destroying charts before recreation

---

## Event Handling

### Search Input
- **Event**: `input` on `searchInput` element
- **Handler**: `filterTransactions()`
- **Behavior**: Real-time filtering as user types

### Filter Dropdown
- **Event**: `change` on `filterType` element  
- **Handler**: `filterTransactions()`
- **Behavior**: Immediate filtering when selection changes

### Tab Buttons
- **Event**: `click` on tab button elements
- **Handler**: `switchTab()` with appropriate tab name
- **Behavior**: Navigation between dashboard sections

### Modal Controls
- **Event**: `click` on close button and modal backdrop
- **Handler**: Removes `show` class from modal
- **Behavior**: Closes transaction detail modal

---

## Dependencies

### External Libraries
- **Chart.js**: Data visualization library for all charts
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Font Awesome**: Icon library for UI elements

### Browser APIs
- **Date**: For timestamp manipulation and formatting
- **Set**: For unique contact counting
- **Array methods**: For data processing and filtering
- **DOM manipulation**: For dynamic content rendering

---

## Performance Considerations

### Chart Management
- Charts are destroyed before recreation to prevent memory leaks
- Global `charts` object maintains references for cleanup

### Data Processing
- Calculations are performed on-demand rather than cached
- Filtering uses efficient Array.filter() method
- Date parsing leverages native Date constructor

### DOM Updates
- Batch DOM updates using innerHTML for better performance
- Event delegation used where appropriate
- Debouncing not implemented but could be added for search input