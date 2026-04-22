---
title: "React Native에 대해서"
date: "2025-11-17"
description: "크로스 플랫폼 모바일 앱 개발 프레임워크 React Native에 대해 알아보자."
---

## React Native란?

React Native는 Facebook(현 Meta)에서 개발한 오픈소스 모바일 애플리케이션 프레임워크이다. JavaScript와 React를 사용하여 iOS와 Android 앱을 동시에 개발할 수 있게 해준다.

## React Native의 특징

1. **크로스 플랫폼 개발**

   - 하나의 코드베이스로 iOS와 Android 앱 동시 개발
   - 대부분의 코드를 공유하여 개발 시간 단축

2. **네이티브 성능**

   - JavaScript 브리지를 통해 네이티브 컴포넌트와 통신
   - 네이티브 UI 컴포넌트를 직접 렌더링

3. **Hot Reloading**

   - 코드 변경 시 즉시 반영
   - 앱을 재시작하지 않고도 변경사항 확인 가능

4. **커뮤니티와 생태계**
   - 풍부한 라이브러리와 패키지
   - 활발한 커뮤니티 지원

## React와 React Native의 차이점

### 주요 차이점

| 항목        | React (Web)      | React Native        |
| ----------- | ---------------- | ------------------- |
| 렌더링 대상 | DOM 요소         | 네이티브 컴포넌트   |
| 스타일링    | CSS              | StyleSheet API      |
| 레이아웃    | CSS Flexbox/Grid | Flexbox만 지원      |
| 네비게이션  | React Router     | React Navigation 등 |
| 플랫폼      | 브라우저         | iOS/Android         |

### 컴포넌트 차이

```jsx
// React (Web)
import React from "react";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => alert("Clicked")}>Click me</button>
    </div>
  );
}

// React Native
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

function App() {
  return (
    <View>
      <Text>Hello World</Text>
      <TouchableOpacity onPress={() => Alert.alert("Clicked")}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## 개발 환경 설정

### 필수 요구사항

1. **Node.js** (v14 이상)
2. **npm 또는 yarn**
3. **React Native CLI**
4. **플랫폼별 도구**
   - iOS: Xcode (macOS만)
   - Android: Android Studio, JDK

### React Native CLI 설치

```bash
npm install -g react-native-cli
```

### 새 프로젝트 생성

```bash
# React Native CLI 사용
npx react-native init MyApp

# 또는 Expo 사용 (권장)
npx create-expo-app MyApp
```

## Expo vs React Native CLI

### Expo

**장점:**

- 빠른 시작과 간편한 설정
- OTA(Over-The-Air) 업데이트 지원
- 다양한 내장 API 제공
- 개발 빌드 없이 바로 테스트 가능

**단점:**

- 네이티브 모듈 추가 시 제한적
- 앱 크기가 상대적으로 큼

### React Native CLI

**장점:**

- 완전한 네이티브 모듈 접근
- 더 작은 앱 크기
- 더 많은 커스터마이징 가능

**단점:**

- 복잡한 설정 과정
- 네이티브 코드 수정 필요 시 지식 필요

## 기본 컴포넌트

### View

`div`와 유사한 컨테이너 컴포넌트:

```jsx
import { View } from "react-native";

<View style={{ flex: 1, padding: 20 }}>
  <Text>Content</Text>
</View>;
```

### Text

텍스트를 표시하는 컴포넌트:

```jsx
import { Text } from "react-native";

<Text style={{ fontSize: 18, fontWeight: "bold" }}>Hello React Native</Text>;
```

### Image

이미지를 표시하는 컴포넌트:

```jsx
import { Image } from "react-native";

// 로컬 이미지
<Image source={require("./assets/logo.png")} />

// 네트워크 이미지
<Image
  source={{ uri: "https://example.com/image.jpg" }}
  style={{ width: 200, height: 200 }}
/>

// 리사이즈 모드
<Image
  source={require("./assets/logo.png")}
  resizeMode="contain"
/>
```

### ScrollView

스크롤 가능한 컨테이너:

```jsx
import { ScrollView, Text } from "react-native";

<ScrollView>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</ScrollView>;
```

### FlatList

성능 최적화된 리스트 컴포넌트:

```jsx
import { FlatList, Text } from "react-native";

const data = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

<FlatList
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.title}</Text>}
/>;
```

### TouchableOpacity / Pressable

터치 가능한 컴포넌트:

```jsx
import { TouchableOpacity, Pressable, Text } from "react-native";

// TouchableOpacity (권장하지 않음, Pressable 사용 권장)
<TouchableOpacity onPress={() => console.log("Pressed")}>
  <Text>Button</Text>
</TouchableOpacity>

// Pressable (권장)
<Pressable
  onPress={() => console.log("Pressed")}
  onPressIn={() => console.log("Press In")}
  onPressOut={() => console.log("Press Out")}
>
  <Text>Button</Text>
</Pressable>
```

## 스타일링

### StyleSheet API

```jsx
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
    </View>
  );
}
```

### Flexbox 레이아웃

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // 'column' (기본값) 또는 'row'
    justifyContent: "center", // 주축 정렬
    alignItems: "center", // 교차축 정렬
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    margin: 10,
  },
});
```

### 주요 스타일 속성

- **레이아웃**: `flex`, `flexDirection`, `justifyContent`, `alignItems`
- **크기**: `width`, `height`, `minWidth`, `maxHeight`
- **여백**: `margin`, `marginTop`, `padding`, `paddingHorizontal`
- **테두리**: `borderWidth`, `borderColor`, `borderRadius`
- **색상**: `backgroundColor`, `color`
- **텍스트**: `fontSize`, `fontWeight`, `textAlign`

## 상태 관리

### useState Hook

```jsx
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

### Context API

```jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

### Redux / Zustand

```bash
# Redux Toolkit
npm install @reduxjs/toolkit react-redux

# Zustand
npm install zustand
```

## 네비게이션

### React Navigation

가장 널리 사용되는 네비게이션 라이브러리:

```bash
npm install @react-navigation/native
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
```

```jsx
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
```

### 탭 네비게이션

```bash
npm install @react-navigation/bottom-tabs
```

```jsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

## 네이티브 모듈

### 네이티브 모듈 생성 (Android)

```java
// android/app/src/main/java/com/myapp/ToastModule.java
package com.myapp;

import android.widget.Toast;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ToastModule extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "ToastModule";
    }

    @ReactMethod
    public void show(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }
}
```

### JavaScript에서 사용

```jsx
import { NativeModules } from "react-native";

const { ToastModule } = NativeModules;

ToastModule.show("Hello from Native!");
```

## API 호출

### Fetch API

```jsx
import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.example.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

### Axios 사용

```bash
npm install axios
```

```jsx
import axios from "axios";

const fetchUsers = async () => {
  try {
    const response = await axios.get("https://api.example.com/users");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
```

## 성능 최적화

### FlatList 최적화

```jsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
  removeClippedSubviews={true} // 화면 밖 항목 제거
  maxToRenderPerBatch={10} // 한 번에 렌더링할 항목 수
  windowSize={10} // 렌더링할 윈도우 크기
  initialNumToRender={10} // 초기 렌더링 항목 수
/>
```

### 메모이제이션

```jsx
import React, { memo, useMemo, useCallback } from "react";

const Item = memo(({ item, onPress }) => {
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

function List({ items }) {
  const handlePress = useCallback((id) => {
    console.log("Pressed:", id);
  }, []);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }, [items]);

  return (
    <FlatList
      data={sortedItems}
      renderItem={({ item }) => <Item item={item} onPress={handlePress} />}
    />
  );
}
```

### 이미지 최적화

```jsx
import { Image } from "react-native";

<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  resizeMode="cover"
  // 캐싱 최적화
  cache="force-cache"
/>;
```

## 디버깅

### React Native Debugger

```bash
npm install -g react-native-debugger
```

### Flipper

Facebook에서 개발한 디버깅 도구:

```bash
# 자동으로 설치됨 (React Native 0.62+)
```

### 콘솔 로그

```jsx
import { LogBox } from "react-native";

// 특정 경고 숨기기
LogBox.ignoreLogs(["Warning: ..."]);

// 모든 경고 숨기기 (권장하지 않음)
LogBox.ignoreAllLogs();
```

## 빌드 및 배포

### Android APK 빌드

```bash
cd android
./gradlew assembleRelease
```

### iOS 빌드

```bash
cd ios
pod install
# Xcode에서 Archive 생성
```

### Expo 빌드

```bash
# Android
eas build --platform android

# iOS
eas build --platform ios
```

## 자주 사용하는 라이브러리

### UI 라이브러리

- **React Native Elements**: UI 컴포넌트 라이브러리
- **NativeBase**: 크로스 플랫폼 UI 프레임워크
- **React Native Paper**: Material Design 컴포넌트

### 상태 관리

- **Redux Toolkit**: 예측 가능한 상태 관리
- **Zustand**: 가벼운 상태 관리
- **MobX**: 반응형 상태 관리

### 네비게이션

- **React Navigation**: 가장 인기 있는 네비게이션 라이브러리
- **React Native Navigation**: 네이티브 네비게이션

### 폼 관리

- **React Hook Form**: 성능 최적화된 폼 관리
- **Formik**: 폼 상태 관리

### 네트워킹

- **Axios**: HTTP 클라이언트
- **Apollo Client**: GraphQL 클라이언트

## 주의사항 및 모범 사례

1. **플랫폼별 코드 작성**

   ```jsx
   import { Platform } from "react-native";

   const styles = StyleSheet.create({
     container: {
       paddingTop: Platform.OS === "ios" ? 20 : 0,
     },
   });
   ```

2. **안전 영역 처리**

   ```jsx
   import { SafeAreaView } from "react-native-safe-area-context";

   <SafeAreaView style={{ flex: 1 }}>{/* Content */}</SafeAreaView>;
   ```

3. **성능 모니터링**

   - React DevTools Profiler 사용
   - Flipper Performance Monitor 활용

4. **에러 처리**

   ```jsx
   import { ErrorBoundary } from "react-error-boundary";

   function ErrorFallback({ error }) {
     return <Text>Something went wrong: {error.message}</Text>;
   }

   <ErrorBoundary FallbackComponent={ErrorFallback}>
     <App />
   </ErrorBoundary>;
   ```

5. **테스트 작성**
   ```bash
   npm install --save-dev @testing-library/react-native
   ```

## React Native vs Flutter vs Native

| 항목          | React Native          | Flutter   | Native       |
| ------------- | --------------------- | --------- | ------------ |
| 언어          | JavaScript/TypeScript | Dart      | Swift/Kotlin |
| 성능          | 좋음                  | 매우 좋음 | 최고         |
| 개발 속도     | 빠름                  | 빠름      | 느림         |
| 코드 공유     | 높음                  | 높음      | 없음         |
| 커뮤니티      | 매우 큼               | 큼        | 플랫폼별     |
| 네이티브 접근 | 제한적                | 제한적    | 완전         |

## 결론

React Native는 웹 개발 지식을 활용해 모바일 앱을 개발할 수 있게 해주는 강력한 프레임워크이다. 크로스 플랫폼 개발의 이점과 풍부한 생태계를 통해 빠르게 모바일 앱을 구축할 수 있다. 하지만 네이티브 모듈이나 복잡한 기능이 필요한 경우 추가적인 학습과 설정이 필요하다. 프로젝트의 요구사항과 팀의 기술 스택을 고려하여 적절한 도구를 선택하는 것이 중요하다.
